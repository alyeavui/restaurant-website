import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review, ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() restaurantId!: number;
  
  reviews: Review[] = [];
  reviewForm: FormGroup;
  editingReview: Review | null = null;
  errorMessage = '';
  
  isLoggedIn = false;
  currentUserId: number | null = null;
  private authSubscription: Subscription | null = null;
  
  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.reviewForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    // Subscribe to auth changes
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      this.currentUserId = this.authService.getCurrentUserId();
    });
    
    // Initialize current auth state
    this.isLoggedIn = this.authService.isAuthenticated();
    this.currentUserId = this.authService.getCurrentUserId();
    
    this.loadReviews();
  }
  
  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  loadReviews(): void {
    this.reviewService.getReviews(this.restaurantId).subscribe({
      next: (response) => {
        this.reviews = response.reviews;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.errorMessage = 'Unable to load comments. Please try again later.';
      }
    });
  }

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      return;
    }

    if (this.editingReview) {
      this.updateReview();
    } else {
      this.addReview();
    }
  }

  addReview(): void {
    const reviewData = this.reviewForm.value;
    
    this.reviewService.addReview(this.restaurantId, reviewData).subscribe({
      next: (response) => {
        this.reviews.unshift(response.new_review);
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding comment:', error);
        this.errorMessage = 'Failed to add comment. Please try again.';
      }
    });
  }

  updateReview(): void {
    if (!this.editingReview) return;
    
    const reviewData = this.reviewForm.value;
    
    this.reviewService.updateReview(this.restaurantId, this.editingReview.id, reviewData).subscribe({
      next: (response) => {
        const index = this.reviews.findIndex(r => r.id === this.editingReview!.id);
        if (index !== -1) {
          this.reviews[index] = response.review;
        }
        this.resetForm();
      },
      error: (error) => {
        console.error('Error updating comment:', error);
        this.errorMessage = 'Failed to update comment. Please try again.';
      }
    });
  }

  editReview(review: Review): void {
    this.editingReview = review;
    this.reviewForm.patchValue({
      text: review.text,
      rating: review.rating
    });
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.reviewService.deleteReview(this.restaurantId, reviewId).subscribe({
        next: () => {
          this.reviews = this.reviews.filter(r => r.id !== reviewId);
        },
        error: (error) => {
          console.error('Error deleting comment:', error);
          this.errorMessage = 'Failed to delete comment. Please try again.';
        }
      });
    }
  }

  resetForm(): void {
    this.reviewForm.reset({rating: 5});
    this.editingReview = null;
    this.errorMessage = '';
  }

  canEditReview(review: Review): boolean {
    return this.isLoggedIn && this.currentUserId === review.user;
  }

  getRatingStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }
  
  login(): void {
    this.router.navigate(['/login']);
  }
}
