import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface CategoryCardData {
  id: string;
  name: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button
      [routerLink]="['/search']"
      [queryParams]="{ category: category.name }"
      class="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center border border-gray-100 hover:border-primary-300 transform hover:-translate-y-1 active:scale-95 w-full"
      [attr.aria-label]="'Browse ' + category.name + ' businesses'"
    >
      <!-- Icon Container -->
      <div class="mb-4 flex justify-center">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300">
          <span class="text-3xl">{{ category.icon }}</span>
        </div>
      </div>
      
      <!-- Category Name -->
      <h3 class="font-semibold text-gray-900 mb-2 text-lg group-hover:text-primary-600 transition-colors">
        {{ category.name }}
      </h3>
      
      <!-- Business Count -->
      <p class="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
        {{ category.count }} {{ category.count === 1 ? 'business' : 'businesses' }}
      </p>
      
      <!-- Hover Indicator -->
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary-600 group-hover:w-12 transition-all duration-300 rounded-full"></div>
    </button>
  `,
  styles: []
})
export class CategoryCardComponent {
  @Input({ required: true }) category!: CategoryCardData;
}
