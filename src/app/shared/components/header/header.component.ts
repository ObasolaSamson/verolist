import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <a routerLink="/" class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-primary-600">Verolist</span>
          </a>

          <!-- Desktop nav -->
          <nav class="hidden md:flex items-center space-x-6">
            <a routerLink="/" routerLinkActive="text-primary-600" [routerLinkActiveOptions]="{exact: true}"
               class="text-gray-700 hover:text-primary-600 transition-colors">Home</a>
            <a routerLink="/search" routerLinkActive="text-primary-600"
               class="text-gray-700 hover:text-primary-600 transition-colors">Browse</a>
          </nav>

          <!-- Mobile menu button -->
          <button
            type="button"
            (click)="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle menu"
            [attr.aria-expanded]="mobileMenuOpen"
          >
            <svg *ngIf="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg *ngIf="mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile nav (toggle) -->
        <nav *ngIf="mobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
          <a routerLink="/" routerLinkActive="text-primary-600" [routerLinkActiveOptions]="{exact: true}"
             (click)="mobileMenuOpen = false"
             class="py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium">Home</a>
          <a routerLink="/search" routerLinkActive="text-primary-600"
             (click)="mobileMenuOpen = false"
             class="py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium">Browse</a>
        </nav>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  mobileMenuOpen = false;
  constructor(private router: Router) {}
}

