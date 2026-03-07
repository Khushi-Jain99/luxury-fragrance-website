import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;

  constructor(
    public wishlist: WishlistService,
    private cart: CartService
  ) {}

  get ratingWidth(): string {
    return `${(this.product.rating / 5) * 100}%`;
  }

  onToggleWishlist(): void {
    this.wishlist.toggle(this.product.id);
  }

  onQuickAdd(): void {
    this.cart.add(this.product.id);
  }
}
