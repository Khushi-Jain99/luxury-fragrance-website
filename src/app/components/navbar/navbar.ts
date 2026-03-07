import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../services/product';
import { WishlistService } from '../../services/wishlist';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private products = inject(ProductService);
  wishlist = inject(WishlistService);
  cart = inject(CartService);

  isMenuOpen = signal(false);
  isScrolled = signal(false);
  isSearchOpen = signal(false);
  searchQuery = signal('');
  suggestions = computed<Product[]>(() => this.products.searchProducts(this.searchQuery()).slice(0, 5));

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isSearchOpen.set(false);
    this.isMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleSearch(): void {
    this.isSearchOpen.set(!this.isSearchOpen());
    if (!this.isSearchOpen()) {
      this.searchQuery.set('');
    }
  }

  closeSearch(): void {
    this.isSearchOpen.set(false);
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
