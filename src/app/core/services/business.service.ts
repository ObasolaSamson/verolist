import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, shareReplay, catchError } from 'rxjs/operators';
import { Business } from '../models/business.model';
import { SearchFilters } from '../models/search-filters.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private businesses: Business[] = [];
  private businessesLoaded = false;
  private businesses$: Observable<Business[]>;

  constructor(private http: HttpClient) {
    // Create a shared observable for businesses to avoid multiple HTTP calls
    this.businesses$ = this.http.get<Business[]>('assets/data/businesses.json').pipe(
      tap(data => {
        this.businesses = data;
        this.businessesLoaded = true;
      }),
      catchError(error => {
        console.error('Error loading businesses:', error);
        return of([] as Business[]);
      }),
      shareReplay(1) // Cache the result
    );
    
    // Preload businesses
    this.loadBusinesses();
  }

  private loadBusinesses() {
    if (!this.businessesLoaded) {
      this.businesses$.subscribe();
    }
  }

  getAllBusinesses(): Observable<Business[]> {
    if (this.businessesLoaded) {
      return of(this.businesses);
    }
    return this.businesses$;
  }

  getBusinessById(id: string): Observable<Business | undefined> {
    return this.getAllBusinesses().pipe(
      map(businesses => businesses.find(b => b.id === id))
    );
  }

  searchBusinesses(filters: SearchFilters): Observable<Business[]> {
    return this.getAllBusinesses().pipe(
      map(businesses => {
        let results = [...businesses];

        // Filter by query (name, category, description, or area)
        if (filters.query && filters.query.trim()) {
          const query = filters.query.toLowerCase().trim();
          results = results.filter(b => 
            b.name.toLowerCase().includes(query) || 
            b.category.toLowerCase().includes(query) ||
            b.description.toLowerCase().includes(query) ||
            b.area.toLowerCase().includes(query) ||
            b.address.toLowerCase().includes(query)
          );
        }

        // Filter by category (exact match)
        if (filters.category && filters.category.trim()) {
          results = results.filter(b => b.category === filters.category);
        }

        // Filter by area (exact match for Lagos areas)
        if (filters.area && filters.area.trim()) {
          results = results.filter(b => b.area === filters.area);
        }

        // Filter by minimum rating
        if (filters.minRating !== undefined && filters.minRating !== null) {
          results = results.filter(b => b.rating >= filters.minRating!);
        }

        // Sort results
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'rating':
              // Sort by rating (highest first), then by review count as tiebreaker
              results.sort((a, b) => {
                if (b.rating !== a.rating) {
                  return b.rating - a.rating;
                }
                return b.reviewCount - a.reviewCount;
              });
              break;
            case 'popularity':
              // Sort by review count (most popular first), then by rating as tiebreaker
              results.sort((a, b) => {
                if (b.reviewCount !== a.reviewCount) {
                  return b.reviewCount - a.reviewCount;
                }
                return b.rating - a.rating;
              });
              break;
            case 'name':
              // Sort alphabetically
              results.sort((a, b) => a.name.localeCompare(b.name));
              break;
          }
        }

        return results;
      }),
      catchError(error => {
        console.error('Error searching businesses:', error);
        return of([] as Business[]);
      })
    );
  }

  getFeaturedBusinesses(): Observable<Business[]> {
    return this.getAllBusinesses()
      .pipe(
        map(businesses => 
          businesses
            .filter(b => b.verified)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6)
        )
      );
  }

  getBusinessesByCategory(category: string): Observable<Business[]> {
    return this.getAllBusinesses().pipe(
      map(businesses => businesses.filter(b => b.category === category))
    );
  }

  getCategories(): Observable<{ id: string; name: string; icon: string; count: number }[]> {
    const categoryIcons: { [key: string]: string } = {
      'Restaurants': '🍽️',
      'Salons': '💇',
      'Clinics': '🏥',
      'Auto': '🚗',
      'Home Services': '🔧'
    };

    return this.getAllBusinesses().pipe(
      map(businesses => {
        const categoryMap = new Map<string, number>();
        businesses.forEach(business => {
          const count = categoryMap.get(business.category) || 0;
          categoryMap.set(business.category, count + 1);
        });
        return Array.from(categoryMap.entries()).map(([name, count]) => ({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          icon: categoryIcons[name] || '📍',
          count
        }));
      })
    );
  }

  getAreas(): Observable<string[]> {
    return this.getAllBusinesses().pipe(
      map(businesses => {
        const areas = [...new Set(businesses.map(b => b.area))];
        return areas.sort();
      })
    );
  }
}

