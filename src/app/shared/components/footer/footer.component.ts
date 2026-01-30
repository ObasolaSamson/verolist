import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-gray-800 text-white mt-auto">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">About</h3>
            <p class="text-gray-300 text-sm">
              Verified businesses in Lagos—Lekki, Ikeja, Yaba, and more. Call or WhatsApp directly. No fake listings.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/" class="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a routerLink="/search" class="text-gray-300 hover:text-white transition-colors">Browse Verified</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <p class="text-gray-300 text-sm">
              Lagos, Nigeria<br>
              <a href="mailto:info&#64;verolist.com" class="hover:text-white transition-colors">info&#64;verolist.com</a>
            </p>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 Verolist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}

