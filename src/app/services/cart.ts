import { Injectable, computed, signal } from '@angular/core';

export interface CartEntry {
  productId: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private quantities = signal<Record<number, number>>({});

  readonly totalItems = computed(() =>
    Object.values(this.quantities()).reduce((sum, quantity) => sum + quantity, 0)
  );

  readonly entries = computed<CartEntry[]>(() =>
    Object.entries(this.quantities()).map(([id, quantity]) => ({
      productId: Number(id),
      quantity
    }))
  );

  getQuantity(productId: number): number {
    return this.quantities()[productId] ?? 0;
  }

  add(productId: number, quantity = 1): void {
    this.quantities.update((state) => ({
      ...state,
      [productId]: (state[productId] ?? 0) + quantity
    }));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.quantities.update((state) => ({
      ...state,
      [productId]: quantity
    }));
  }

  remove(productId: number): void {
    this.quantities.update((state) => {
      const nextState = { ...state };
      delete nextState[productId];
      return nextState;
    });
  }

  clear(): void {
    this.quantities.set({});
  }
}
