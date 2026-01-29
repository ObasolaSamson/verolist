import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative w-full">
      <input
        type="text"
        [placeholder]="placeholder"
        [(ngModel)]="searchQuery"
        (ngModelChange)="onModelChange($event)"
        (keyup.enter)="onSearch()"
        class="input-field pr-12"
        aria-label="Search input"
      />
      <button
        type="button"
        (click)="onSearch()"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Search"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
  `,
  styles: []
})
export class SearchInputComponent implements OnInit, OnChanges {
  @Input() placeholder: string = 'Search businesses, categories...';
  @Input() initialValue: string = '';
  @Output() search = new EventEmitter<string>();

  searchQuery: string = '';
  private userHasTyped: boolean = false;
  private isInitializing: boolean = true;

  ngOnInit() {
    // Initialize search query from initialValue if provided
    this.searchQuery = this.initialValue || '';
    // Use setTimeout to mark initialization as complete after Angular's change detection
    setTimeout(() => {
      this.isInitializing = false;
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Only update from initialValue if:
    // 1. Not currently initializing
    // 2. User hasn't typed anything
    // 3. The initialValue actually changed
    if (changes['initialValue'] && !this.isInitializing && !this.userHasTyped) {
      const newValue = changes['initialValue'].currentValue || '';
      const previousValue = changes['initialValue'].previousValue !== undefined 
        ? changes['initialValue'].previousValue || '' 
        : null;
      
      // Only update if the new value is different from previous
      if (newValue !== previousValue) {
        this.searchQuery = newValue;
      }
    }
  }

  onModelChange(value: string) {
    // Mark that user has interacted once they start typing
    if (value && !this.userHasTyped) {
      this.userHasTyped = true;
    }
    // Keep searchQuery in sync (ngModel handles this, but we're being explicit)
    this.searchQuery = value;
  }

  onSearch() {
    const query = this.searchQuery || '';
    this.search.emit(query);
  }
}

