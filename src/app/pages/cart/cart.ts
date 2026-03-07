import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { Product, ProductService } from '../../services/product';
import { SeoService } from '../../services/seo';

interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent implements OnInit {
  private seo = inject(SeoService);
  private products = inject(ProductService);
  cart = inject(CartService);

  cartItems = computed<CartItem[]>(() => {
    return this.cart.entries().map((entry) => {
      const product = this.products.getProductById(entry.productId);
      return product
        ? { product, quantity: entry.quantity, subtotal: product.price * entry.quantity }
        : null;
    }).filter((item): item is CartItem => item !== null);
  });

  total = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.subtotal, 0)
  );

  ngOnInit(): void {
    this.seo.updateTitle('Cart');
    this.seo.updateMeta('Review your luxury fragrance selections before checkout.');
  }

  increment(productId: number): void {
    this.cart.add(productId, 1);
  }

  decrement(productId: number): void {
    const qty = this.cart.getQuantity(productId);
    this.cart.updateQuantity(productId, qty - 1);
  }

  removeItem(productId: number): void {
    this.cart.remove(productId);
  }

  clearCart(): void {
    this.cart.clear();
  }
}
