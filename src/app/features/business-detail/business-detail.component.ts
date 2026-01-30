import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BusinessService } from '../../core/services/business.service';
import { ReviewService } from '../../core/services/review.service';
import { Business } from '../../core/models/business.model';
import { Review } from '../../core/models/review.model';
import { RatingStarsComponent } from '../../shared/components/rating-stars/rating-stars.component';

@Component({
  selector: 'app-business-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, RatingStarsComponent],
  template: `
    <div class="min-h-screen py-8">
      <div *ngIf="loading" class="container mx-auto px-4 text-center py-12">
        <p class="text-gray-600">Loading business details...</p>
      </div>

      <div *ngIf="!loading && !business" class="container mx-auto px-4 text-center py-12">
        <p class="text-gray-600 text-lg mb-4">Business not found</p>
        <button routerLink="/" class="btn-primary">Go Home</button>
      </div>

      <div *ngIf="!loading && business" class="container mx-auto px-4">
        <!-- Back Button -->
        <button 
          (click)="goBack()"
          class="mb-6 text-primary-600 hover:text-primary-700 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Search
        </button>

        <!-- Business Header -->
        <div class="card p-6 mb-6">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2 flex-wrap gap-2">
                <h1 class="text-3xl font-bold text-gray-900">{{ business.name }}</h1>
                <span *ngIf="business.verified" 
                      class="inline-flex items-center gap-1.5 bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold"
                      title="Verified by Verolist">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Verified by Verolist
                </span>
              </div>
              <p class="text-lg text-gray-600 mb-3">{{ business.category }}</p>
              <app-rating-stars 
                [rating]="business.rating" 
                [reviewCount]="business.reviewCount"
                [showRating]="true"
                [showCount]="true">
              </app-rating-stars>
            </div>
          </div>

          <!-- Images -->
          <div class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <img 
                  [src]="business.imageUrl" 
                  [alt]="business.name"
                  class="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
              <div *ngIf="business.images && business.images.length > 1" class="grid grid-cols-1 gap-4">
                <img 
                  *ngFor="let img of business.images.slice(1, 3)"
                  [src]="img"
                  [alt]="business.name"
                  class="w-full h-32 md:h-46 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <!-- Contact Actions - Emphasized -->
          <div class="mb-6 p-5 bg-primary-50 rounded-xl border border-primary-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Contact now—call or WhatsApp directly</h3>
            <div class="flex flex-col sm:flex-row gap-3">
              <a 
                [href]="'tel:' + business.phone"
                class="btn-primary flex items-center justify-center flex-1 py-4 text-base">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Call {{ business.phone }}
              </a>
              <a 
                *ngIf="business.whatsapp"
                [href]="getWhatsAppUrl(business.whatsapp)"
                target="_blank"
                class="flex items-center justify-center flex-1 py-4 px-6 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors border-2 border-green-600 text-base">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          <!-- Business Info Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Address (de-emphasized) -->
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Address</h3>
              <p class="text-gray-700">{{ business.address }}</p>
              <p class="text-gray-600 text-sm mt-1">{{ business.area }}, Lagos</p>
            </div>

            <!-- Phone (quick reference) -->
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Phone</h3>
              <a [href]="'tel:' + business.phone" class="text-primary-600 hover:text-primary-700 font-medium">
                {{ business.phone }}
              </a>
            </div>
          </div>

          <!-- Features -->
          <div *ngIf="business.features && business.features.length > 0" class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Features</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                *ngFor="let feature of business.features"
                class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {{ feature }}
              </span>
            </div>
          </div>

          <!-- Opening Hours -->
          <div *ngIf="business.openingHours" class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Opening Hours</h3>
            <div class="space-y-1">
              <div *ngFor="let day of getDays()" class="flex justify-between text-gray-700">
                <span>{{ day }}:</span>
                <span>{{ business.openingHours![day] }}</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">About</h3>
            <p class="text-gray-700 leading-relaxed">{{ business.description }}</p>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="card p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Reviews ({{ reviews.length }})
          </h2>
          
          <div *ngIf="reviews.length === 0" class="text-center py-8">
            <p class="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>

          <div *ngIf="reviews.length > 0" class="space-y-6">
            <div *ngFor="let review of reviews" class="border-b border-gray-200 pb-6 last:border-0">
              <div class="flex items-start mb-3">
                <div class="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img 
                    *ngIf="review.userAvatar"
                    [src]="review.userAvatar"
                    [alt]="review.userName"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="font-semibold text-gray-900">{{ review.userName }}</h4>
                    <span class="text-sm text-gray-500">{{ formatDate(review.date) }}</span>
                  </div>
                  <app-rating-stars 
                    [rating]="review.rating"
                    [showRating]="false"
                    [showCount]="false">
                  </app-rating-stars>
                </div>
              </div>
              <p class="text-gray-700">{{ review.comment }}</p>
              <div *ngIf="review.helpful" class="mt-2 text-sm text-gray-500">
                {{ review.helpful }} people found this helpful
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BusinessDetailComponent implements OnInit {
  business: Business | null = null;
  reviews: Review[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBusiness(id);
    } else {
      this.loading = false;
    }
  }

  loadBusiness(id: string) {
    this.businessService.getBusinessById(id).subscribe(business => {
      this.business = business || null;
      this.loading = false;
      
      if (this.business) {
        this.loadReviews(id);
      }
    });
  }

  loadReviews(businessId: string) {
    this.reviewService.getReviewsByBusinessId(businessId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  goBack() {
    window.history.back();
  }

  getDays(): string[] {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getWhatsAppUrl(whatsapp: string): string {
    const cleanedNumber = whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanedNumber}`;
  }
}

