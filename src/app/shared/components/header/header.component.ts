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
          <nav class="hidden md:flex items-center space-x-6">
            <a routerLink="/" routerLinkActive="text-primary-600" 
               class="text-gray-700 hover:text-primary-600 transition-colors">Home</a>
            <a routerLink="/search" routerLinkActive="text-primary-600"
               class="text-gray-700 hover:text-primary-600 transition-colors">Browse</a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  constructor(private router: Router) {}
}

