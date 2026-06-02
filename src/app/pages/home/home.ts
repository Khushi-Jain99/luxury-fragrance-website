import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FragranceFamily, Mood, ProductService } from '../../services/product';
import { SeoService } from '../../services/seo';
import { ProductCard } from '../../components/product-card/product-card';
import { ImgFallbackDirective } from '../../directives/img-fallback';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard, ImgFallbackDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);
  private products = inject(ProductService);

  featuredProducts = this.products.getFeaturedProducts();
  bestSellers = this.products.getBestSellers();

  families: FragranceFamily[] = ['Floral', 'Woody', 'Citrus', 'Oriental'];
  selectedFamily = signal<FragranceFamily>('Floral');

  moodOptions: Mood[] = ['Romantic', 'Bold', 'Fresh', 'Elegant'];
  selectedMood = signal<Mood>('Elegant');

  quizFamily = signal<FragranceFamily>('Woody');
  quizIntensity = signal<'Light' | 'Rich'>('Rich');

  comparisonIds = signal<number[]>([]);

  familyProducts = computed(() => this.products.getProductsByFamily(this.selectedFamily()).slice(0, 4));

  recommendedProducts = computed(() => this.products.getRecommendedByMood(this.selectedMood()));

  quizResult = computed(() => {
    const byFamily = this.products.getProductsByFamily(this.quizFamily());
    const filtered = byFamily.filter((product) =>
      this.quizIntensity() === 'Rich' ? product.intensity >= 4 : product.intensity <= 3
    );
    return (filtered[0] ?? byFamily[0]) || null;
  });

  comparedProducts = computed(() => {
    const ids = this.comparisonIds();
    return this.products.getProducts()().filter((product) => ids.includes(product.id));
  });

  testimonials = [
    {
      quote:
        'The packaging, the texture, the scent evolution - every detail feels couture. This is the most luxurious fragrance house I have discovered.',
      author: 'Elena Vance, Fashion Critic'
    },
    {
      quote:
        'Aurelia fragrances feel intimate and expensive without being loud. Ambre Soir has become my signature for evenings.',
      author: 'Mina Clarke, Creative Director'
    },
    {
      quote:
        'From the quiz to checkout, the website experience is seamless and beautifully designed. It feels like entering a private boutique.',
      author: 'Rafael Dean, Collector'
    }
  ];

  ngOnInit() {
    this.seo.updateTitle('Unleash the Essence of Luxury');
    this.seo.updateMeta('Discover Aurelia, a modern luxury perfume house with curated collections, fragrance finder, and elevated ecommerce experience.');
  }

  selectFamily(family: FragranceFamily): void {
    this.selectedFamily.set(family);
  }

  selectMood(mood: Mood): void {
    this.selectedMood.set(mood);
  }

  setQuizFamily(family: FragranceFamily): void {
    this.quizFamily.set(family);
  }

  setQuizIntensity(level: 'Light' | 'Rich'): void {
    this.quizIntensity.set(level);
  }

  toggleCompare(productId: number): void {
    if (this.comparisonIds().includes(productId)) {
      this.comparisonIds.update((ids) => ids.filter((id) => id !== productId));
      return;
    }

    this.comparisonIds.update((ids) => {
      const next = [...ids, productId];
      return next.slice(0, 3);
    });
  }
}
