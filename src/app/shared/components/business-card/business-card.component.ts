import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Business } from '../../../core/models/business.model';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';

@Component({
  selector: 'app-business-card',
  standalone: true,
  imports: [CommonModule, RouterModule, RatingStarsComponent],
  template: `
    <div 
      class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col border border-gray-100 hover:border-primary-200 transform hover:-translate-y-1 active:scale-[0.98]"
      [routerLink]="['/business', business.id]"
      [attr.aria-label]="'View ' + business.name + ' details'"
    >
      <!-- Image Container -->
      <div class="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
        <img 
          [src]="business.imageUrl" 
          [alt]="business.name"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect fill=\'%23f3f4f6\' width=\'400\' height=\'300\'/%3E%3Ctext fill=\'%239ca3af\' font-family=\'sans-serif\' font-size=\'20\' dy=\'10.5\' font-weight=\'bold\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\'%3EBusiness Image%3C/text%3E%3C/svg%3E'"
        >
        
        <!-- Verified Badge -->
        <div *ngIf="business.verified" 
             class="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          Verified
        </div>
        
        <!-- Category Badge -->
        <div class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
          {{ business.category }}
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-5 flex-1 flex flex-col">
        <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3.5rem]">
          {{ business.name }}
        </h3>
        
        <!-- Rating -->
        <div class="mb-4">
          <app-rating-stars 
            [rating]="business.rating" 
            [reviewCount]="business.reviewCount"
            [showRating]="true"
            [showCount]="true">
          </app-rating-stars>
        </div>
        
        <!-- Location -->
        <div class="mt-auto flex items-center text-sm text-gray-600 pt-3 border-t border-gray-100">
          <svg class="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="truncate">{{ business.area }}, Lagos</span>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BusinessCardComponent {
  @Input() business!: Business;
}

