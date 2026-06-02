import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { CartService } from '../../services/cart';
import { ProductService } from '../../services/product';
import { SeoService } from '../../services/seo';
import { WishlistService } from '../../services/wishlist';
import { ImgFallbackDirective } from '../../directives/img-fallback';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ProductCard, ImgFallbackDirective],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private products = inject(ProductService);
  private seo = inject(SeoService);

  cart = inject(CartService);
  wishlist = inject(WishlistService);

  readonly product = signal(this.products.getProductById(1));
  readonly selectedImage = signal('');

  readonly relatedProducts = computed(() => {
    const current = this.product();
    return current ? this.products.getRelatedProducts(current.id) : [];
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id')) || 1;
      const selectedProduct = this.products.getProductById(id);

      this.product.set(selectedProduct);
      this.selectedImage.set(selectedProduct?.gallery[0] ?? '');

      if (selectedProduct) {
        this.seo.updateTitle(selectedProduct.name);
        this.seo.updateMeta(selectedProduct.description);
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage.set(image);
  }

  toggleWishlist(): void {
    const current = this.product();
    if (current) {
      this.wishlist.toggle(current.id);
    }
  }

  addToCart(): void {
    const current = this.product();
    if (current) {
      this.cart.add(current.id);
    }
  }

  indicators(value: number): number[] {
    return Array.from({ length: 5 }, (_, index) => (index < value ? 1 : 0));
  }
}
