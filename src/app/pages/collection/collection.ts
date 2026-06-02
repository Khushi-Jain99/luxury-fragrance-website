import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FragranceFamily, ProductCategory, ProductService } from '../../services/product';
import { SeoService } from '../../services/seo';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class CollectionComponent implements OnInit {
  private seo = inject(SeoService);
  private products = inject(ProductService);

  allProducts = this.products.getProducts();
  categories: (ProductCategory | 'All')[] = ['All', 'Men', 'Women', 'Unisex', 'Sample'];
  families: (FragranceFamily | 'All')[] = ['All', 'Floral', 'Woody', 'Citrus', 'Oriental'];

  selectedCategory = signal<ProductCategory | 'All'>('All');
  selectedFamily = signal<FragranceFamily | 'All'>('All');

  filteredProducts = computed(() => {
    let items = this.allProducts();
    const cat = this.selectedCategory();
    const fam = this.selectedFamily();
    if (cat !== 'All') {
      items = items.filter((p) => p.category === cat);
    }
    if (fam !== 'All') {
      items = items.filter((p) => p.family === fam);
    }
    return items;
  });

  ngOnInit(): void {
    this.seo.updateTitle('Collection');
    this.seo.updateMeta('Explore the full Aurelia fragrance collection — curated luxury perfumes for every occasion.');
  }

  selectCategory(cat: ProductCategory | 'All'): void {
    this.selectedCategory.set(cat);
  }

  selectFamily(fam: FragranceFamily | 'All'): void {
    this.selectedFamily.set(fam);
  }
}
