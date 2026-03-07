import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistIds = signal<number[]>([]);

  readonly count = computed(() => this.wishlistIds().length);
  readonly ids = computed(() => this.wishlistIds());

  isInWishlist(productId: number): boolean {
    return this.wishlistIds().includes(productId);
  }

  toggle(productId: number): void {
    if (this.isInWishlist(productId)) {
      this.wishlistIds.update((ids) => ids.filter((id) => id !== productId));
      return;
    }

    this.wishlistIds.update((ids) => [...ids, productId]);
  }

  remove(productId: number): void {
    this.wishlistIds.update((ids) => ids.filter((id) => id !== productId));
  }

  clear(): void {
    this.wishlistIds.set([]);
  }
}
