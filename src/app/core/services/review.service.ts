import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[] = [];
  private reviewsLoaded = false;

  constructor(private http: HttpClient) {
    this.loadReviews();
  }

  private loadReviews() {
    if (!this.reviewsLoaded) {
      this.http.get<Review[]>('assets/data/reviews.json').subscribe(data => {
        this.reviews = data;
        this.reviewsLoaded = true;
      });
    }
  }

  private getAllReviews(): Observable<Review[]> {
    if (this.reviewsLoaded) {
      return of(this.reviews);
    }
    return this.http.get<Review[]>('assets/data/reviews.json').pipe(
      tap(data => {
        this.reviews = data;
        this.reviewsLoaded = true;
      })
    );
  }

  getReviewsByBusinessId(businessId: string): Observable<Review[]> {
    return this.getAllReviews().pipe(
      map(reviews => reviews.filter(r => r.businessId === businessId))
    );
  }
}

