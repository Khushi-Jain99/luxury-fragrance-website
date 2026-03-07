import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { WishlistService } from '../../services/wishlist';
import { CartService } from '../../services/cart';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class WishlistComponent implements OnInit {
  private seo = inject(SeoService);
  private products = inject(ProductService);
  wishlist = inject(WishlistService);
  private cart = inject(CartService);

  wishlistProducts = computed(() => {
    const ids = this.wishlist.ids();
    return this.products.getProducts()().filter((p) => ids.includes(p.id));
  });

  ngOnInit(): void {
    this.seo.updateTitle('Wishlist');
    this.seo.updateMeta('Your saved luxury fragrances — revisit your favourites anytime.');
  }

  removeFromWishlist(productId: number): void {
    this.wishlist.remove(productId);
  }

  addToCart(productId: number): void {
    this.cart.add(productId);
  }
}
