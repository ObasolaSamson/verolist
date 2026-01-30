import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessService } from '../../core/services/business.service';
import { Business } from '../../core/models/business.model';
import { BusinessCardComponent } from '../../shared/components/business-card/business-card.component';
import { CategoryCardComponent, CategoryCardData } from '../../shared/components/category-card/category-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, BusinessCardComponent, CategoryCardComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section with Search -->
      <section class="relative bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 text-gray-900 overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        </div>
        
        <div class="relative container mx-auto px-4 py-12 md:py-20">
          <div class="max-w-4xl mx-auto text-center">
            <!-- Logo/Brand -->
            <div class="mb-6 inline-flex items-center justify-center gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-2xl border-[3px] border-primary-300 bg-white/60 backdrop-blur-sm shadow-lg shadow-primary-200/30">
              <div class="w-14 h-14 md:w-16 md:h-16 bg-primary-200/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-primary-300 shadow-md">
                <span class="text-3xl md:text-4xl">📍</span>
              </div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Verolist</h1>
            </div>
            
            <!-- Main Heading -->
            <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Discover verified businesses<br class="hidden md:block">
              <span class="text-primary-700">you can trust in Lagos</span>
            </h2>
            
            <!-- Subheading -->
            <p class="text-lg md:text-xl mb-8 md:mb-10 text-gray-700 max-w-2xl mx-auto px-4">
              Verified businesses. Real connections.
              Discover trusted places across Lagos in minutes.
            </p>
            
            <!-- Search Bar (inline - owned by home component) -->
            <div class="max-w-3xl mx-auto mb-6 md:mb-8">
              <div class="relative w-full">
                <input
                  type="text"
                  [(ngModel)]="homeSearchQuery"
                  (keyup.enter)="onSearch()"
                  placeholder="Search verified businesses, categories, or areas..."
                  class="w-full px-4 py-3 pr-12 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 text-gray-900 placeholder-gray-500"
                  aria-label="Search businesses"
                />
                <button
                  type="button"
                  (click)="onSearch()"
                  class="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                  aria-label="Search"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-8 pt-8 border-t border-primary-300">
              <div>
                <div class="text-2xl md:text-3xl font-bold text-gray-900">{{ totalBusinesses }}+</div>
                <div class="text-sm md:text-base text-gray-600 mt-1">Businesses</div>
              </div>
              <div>
                <div class="text-2xl md:text-3xl font-bold text-gray-900">{{ categories.length }}+</div>
                <div class="text-sm md:text-base text-gray-600 mt-1">Categories</div>
              </div>
              <div>
                <div class="text-2xl md:text-3xl font-bold text-gray-900">100%</div>
                <div class="text-sm md:text-base text-gray-600 mt-1">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Verolist -->
      <section class="py-8 md:py-12 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Why Verolist?</h2>
          <div class="max-w-2xl mx-auto space-y-4">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                <svg class="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </span>
              <p class="text-gray-700">Verified businesses only—every listing is checked before it goes live.</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
              </span>
              <p class="text-gray-700">Lagos-focused discovery—Lekki, Ikeja, Yaba, Victoria Island, and more.</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </span>
              <p class="text-gray-700">No fake or outdated listings—call or WhatsApp businesses with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Categories -->
      <section class="py-8 md:py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-8 md:mb-12">
            <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              Browse by Category
            </h2>
            <p class="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Browse verified businesses by category
            </p>
          </div>
          
          <div *ngIf="categories.length > 0" 
               class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            <app-category-card 
              *ngFor="let category of categories"
              [category]="category">
            </app-category-card>
          </div>
          
          <div *ngIf="categories.length === 0 && !loading" 
               class="text-center py-12">
            <p class="text-gray-500">No categories available</p>
          </div>
        </div>
      </section>

      <!-- Popular Areas in Lagos -->
      <section *ngIf="popularAreas.length > 0" class="py-8 md:py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-8 md:mb-12">
            <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              Popular Areas in Lagos
            </h2>
            <p class="text-gray-600 text-base md:text-lg">
              Discover businesses in trending neighborhoods
            </p>
          </div>
          
          <div class="flex flex-wrap justify-center gap-3 md:gap-4">
            <button
              *ngFor="let area of popularAreas"
              (click)="onAreaClick(area)"
              class="px-6 py-3 bg-white rounded-full text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-primary-300 active:scale-95"
            >
              <span class="mr-2">📍</span>
              {{ area }}
            </button>
          </div>
        </div>
      </section>

      <!-- Featured/Verified Businesses -->
      <section class="py-8 md:py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                Verified Businesses
              </h2>
              <p class="text-gray-600 text-base md:text-lg">
                Trusted businesses you can call or WhatsApp directly
              </p>
            </div>
            <button
              (click)="router.navigate(['/search'])"
              class="hidden md:block btn-secondary text-sm"
            >
              View All
            </button>
          </div>
          
          <!-- Loading State -->
          <div *ngIf="loading" class="text-center py-16">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
            <p class="text-gray-600">Loading businesses...</p>
          </div>
          
          <!-- Business Grid -->
          <div *ngIf="!loading && featuredBusinesses.length > 0" 
               class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <app-business-card 
              *ngFor="let business of featuredBusinesses"
              [business]="business">
            </app-business-card>
          </div>
          
          <!-- Empty State -->
          <div *ngIf="!loading && featuredBusinesses.length === 0" 
               class="text-center py-16">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
            <p class="text-gray-600 mb-6">Try adjusting your search or browse by category</p>
            <button
              (click)="router.navigate(['/search'])"
              class="btn-primary"
            >
              Browse All Businesses
            </button>
          </div>
          
          <!-- View More Button (Mobile) -->
          <div *ngIf="!loading && featuredBusinesses.length > 0" 
               class="text-center mt-8 md:hidden">
            <button
              (click)="router.navigate(['/search'])"
              class="btn-primary w-full sm:w-auto"
            >
              View All Businesses
            </button>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="py-12 md:py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-2xl md:text-4xl font-bold mb-4">
            Own a Business in Lagos?
          </h2>
          <p class="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get verified and reach customers who trust Verolist for real, contactable businesses
          </p>
          <button
            class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            (click)="contactUs()"
          >
            Contact Us to Get Listed
          </button>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  categories: CategoryCardData[] = [];
  featuredBusinesses: Business[] = [];
  popularAreas: string[] = [];
  totalBusinesses: number = 0;
  loading: boolean = true;
  homeSearchQuery = '';

  constructor(
    public businessService: BusinessService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadFeaturedBusinesses();
    this.loadPopularAreas();
    this.loadTotalBusinesses();
  }

  loadCategories() {
    this.businessService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadFeaturedBusinesses() {
    this.businessService.getFeaturedBusinesses().subscribe(businesses => {
      this.featuredBusinesses = businesses;
      this.loading = false;
    });
  }

  loadPopularAreas() {
    this.businessService.getAreas().subscribe(areas => {
      // Get top 8 most popular areas (or all if less than 8)
      this.popularAreas = areas.slice(0, 8);
    });
  }

  loadTotalBusinesses() {
    this.businessService.getAllBusinesses().subscribe(businesses => {
      this.totalBusinesses = businesses.length;
    });
  }

  onSearch() {
    const query = (this.homeSearchQuery || '').trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }

  onCategoryClick(category: string) {
    this.router.navigate(['/search'], { queryParams: { category } });
  }

  onAreaClick(area: string) {
    this.router.navigate(['/search'], { queryParams: { area } });
  }

  contactUs() {
    // In a real app, this could navigate to a contact page or open a modal
    window.location.href = 'mailto:info&#64;verolist.com?subject=Business Listing Inquiry';
  }
}

