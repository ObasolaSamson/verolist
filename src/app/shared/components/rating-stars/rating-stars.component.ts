import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-1">
      <div class="flex">
        <span *ngFor="let star of stars" class="text-lg">
          <span *ngIf="star === 1" class="text-yellow-400">★</span>
          <span *ngIf="star === 0.5" class="text-yellow-400">☆</span>
          <span *ngIf="star === 0" class="text-gray-300">☆</span>
        </span>
      </div>
      <span *ngIf="showRating" class="text-sm font-semibold text-gray-700 ml-1">
        {{ rating.toFixed(1) }}
      </span>
      <span *ngIf="showCount" class="text-sm text-gray-500 ml-1">
        ({{ reviewCount }})
      </span>
    </div>
  `,
  styles: []
})
export class RatingStarsComponent {
  @Input() rating: number = 0;
  @Input() reviewCount: number = 0;
  @Input() showRating: boolean = true;
  @Input() showCount: boolean = true;

  get stars(): number[] {
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return [
      ...Array(fullStars).fill(1),
      ...(hasHalfStar ? [0.5] : []),
      ...Array(emptyStars).fill(0)
    ];
  }
}

