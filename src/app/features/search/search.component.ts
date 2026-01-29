import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap, catchError } from 'rxjs/operators';
import { BusinessService } from '../../core/services/business.service';
import { Business } from '../../core/models/business.model';
import { SearchFilters } from '../../core/models/search-filters.model';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { BusinessCardComponent } from '../../shared/components/business-card/business-card.component';
import { RatingStarsComponent } from '../../shared/components/rating-stars/rating-stars.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    SearchInputComponent, 
    BusinessCardComponent,
    RatingStarsComponent
  ],
  template: `
    <div class="min-h-screen py-8">
      <div class="container mx-auto px-4">
        <!-- Search Header -->
        <div class="mb-8">
          <app-search-input 
            [initialValue]="filters.query || ''"
            placeholder="Search businesses, categories..."
            (search)="onSearch($event)">
          </app-search-input>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Filters Sidebar -->
          <aside class="lg:col-span-1">
            <div class="card p-6 sticky top-20">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Filters</h2>
              
              <!-- Category Filter -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select 
                  [ngModel]="filters.category || ''"
                  (ngModelChange)="onCategoryChange($event)"
                  class="input-field">
                  <option value="">All Categories</option>
                  <option *ngFor="let cat of categories" [value]="cat.name">
                    {{ cat.name }} ({{ cat.count }})
                  </option>
                </select>
              </div>

              <!-- Area Filter -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Lagos Area</label>
                <select 
                  [ngModel]="filters.area || ''"
                  (ngModelChange)="onAreaChange($event)"
                  class="input-field">
                  <option value="">All Areas</option>
                  <option *ngFor="let area of areas" [value]="area">
                    {{ area }}
                  </option>
                </select>
              </div>

              <!-- Rating Filter -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Minimum Rating</label>
                <select 
                  [ngModel]="filters.minRating ?? undefined"
                  (ngModelChange)="onRatingChange($event === '' ? undefined : +$event)"
                  class="input-field">
                  <option [value]="undefined">Any Rating</option>
                  <option [value]="3">3+ Stars</option>
                  <option [value]="4">4+ Stars</option>
                  <option [value]="4.5">4.5+ Stars</option>
                </select>
              </div>

              <!-- Sort By -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select 
                  [ngModel]="filters.sortBy || 'popularity'"
                  (ngModelChange)="onSortChange($event)"
                  class="input-field">
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              <!-- Clear Filters -->
              <button 
                (click)="clearFilters()"
                class="btn-secondary w-full">
                Clear Filters
              </button>
            </div>
          </aside>

          <!-- Results -->
          <div class="lg:col-span-3">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ results.length }} Business{{ results.length !== 1 ? 'es' : '' }} Found
              </h2>
            </div>

            <!-- Loading State -->
            <div *ngIf="loading" class="text-center py-16">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
              <p class="text-gray-600 text-lg">Searching businesses...</p>
            </div>

            <!-- Empty State -->
            <div *ngIf="!loading && results.length === 0" class="text-center py-16">
              <div class="text-6xl mb-4">🔍</div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
              <p class="text-gray-600 mb-6">
                Try adjusting your search terms, filters, or browse by category
              </p>
              <button 
                (click)="clearFilters()"
                class="btn-primary">
                Clear All Filters
              </button>
            </div>

            <div *ngIf="!loading && results.length > 0" 
                 class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <app-business-card 
                *ngFor="let business of results"
                [business]="business">
              </app-business-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SearchComponent implements OnInit, OnDestroy {
  results: Business[] = [];
  categories: { id: string; name: string; icon: string; count: number }[] = [];
  areas: string[] = [];
  loading: boolean = false;
  filters: SearchFilters = {
    sortBy: 'popularity'
  };

  // RxJS subjects for reactive filtering
  private searchSubject = new Subject<string>();
  private filtersSubject = new BehaviorSubject<SearchFilters>({ sortBy: 'popularity' });
  private destroy$ = new Subject<void>();

  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadAreas();
    
    // Initialize filters from query params
    this.initializeFiltersFromParams();

    // Setup reactive search with debouncing
    this.setupReactiveSearch();

    // Setup reactive filtering
    this.setupReactiveFilters();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeFiltersFromParams() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const newFilters: SearchFilters = {
          query: params['q'] || '',
          category: params['category'] || '',
          area: params['area'] || '',
          minRating: params['rating'] ? parseFloat(params['rating']) : undefined,
          sortBy: (params['sort'] as 'rating' | 'popularity' | 'name') || 'popularity'
        };
        
        this.filters = newFilters;
        this.filtersSubject.next(newFilters);
        this.searchSubject.next(newFilters.query || '');
      });
  }

  private setupReactiveSearch() {
    // Debounce search queries to avoid too many requests
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after user stops typing
        distinctUntilChanged(), // Only emit if value changed
        tap(query => {
          // Update filters with new query
          const currentFilters = this.filtersSubject.value;
          const updatedFilters: SearchFilters = {
            ...currentFilters,
            query: query
          };
          this.filters = updatedFilters;
          this.filtersSubject.next(updatedFilters);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private setupReactiveFilters() {
    // Combine filters and perform search reactively
    this.filtersSubject
      .pipe(
        distinctUntilChanged((prev, curr) => {
          // Only trigger search if filters actually changed
          return JSON.stringify(prev) === JSON.stringify(curr);
        }),
        tap(() => {
          this.loading = true;
          this.updateQueryParams();
        }),
        switchMap(filters => 
          this.businessService.searchBusinesses(filters).pipe(
            catchError(error => {
              console.error('Search error:', error);
              this.loading = false;
              return of([] as Business[]);
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (businesses) => {
          this.results = businesses;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading search results:', error);
          this.results = [];
          this.loading = false;
        }
      });
  }

  loadCategories() {
    this.businessService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
        }
      });
  }

  loadAreas() {
    this.businessService.getAreas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (areas) => {
          this.areas = areas;
        },
        error: (error) => {
          console.error('Error loading areas:', error);
        }
      });
  }

  onSearch(query: string) {
    // Emit search query to subject (will be debounced)
    this.searchSubject.next(query);
  }

  applyFilters() {
    // Trigger filter update by emitting new filter state
    this.filtersSubject.next({ ...this.filters });
  }

  onCategoryChange(category: string) {
    this.filters.category = category;
    this.applyFilters();
  }

  onAreaChange(area: string) {
    this.filters.area = area;
    this.applyFilters();
  }

  onRatingChange(rating: number | undefined) {
    this.filters.minRating = rating;
    this.applyFilters();
  }

  onSortChange(sortBy: 'rating' | 'popularity' | 'name') {
    this.filters.sortBy = sortBy;
    this.applyFilters();
  }

  clearFilters() {
    const clearedFilters: SearchFilters = {
      query: '',
      category: '',
      area: '',
      minRating: undefined,
      sortBy: 'popularity'
    };
    
    this.filters = clearedFilters;
    this.filtersSubject.next(clearedFilters);
    this.searchSubject.next('');
    
    // Clear URL query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

  private updateQueryParams() {
    const queryParams: any = {};
    
    if (this.filters.query && this.filters.query.trim()) {
      queryParams.q = this.filters.query.trim();
    }
    if (this.filters.category && this.filters.category.trim()) {
      queryParams.category = this.filters.category;
    }
    if (this.filters.area && this.filters.area.trim()) {
      queryParams.area = this.filters.area;
    }
    if (this.filters.minRating !== undefined && this.filters.minRating !== null) {
      queryParams.rating = this.filters.minRating.toString();
    }
    if (this.filters.sortBy && this.filters.sortBy !== 'popularity') {
      queryParams.sort = this.filters.sortBy;
    }

    // Update URL without triggering navigation
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true, // Replace current URL instead of adding to history
      queryParamsHandling: 'merge'
    });
  }
}

