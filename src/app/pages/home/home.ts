import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { SeoService } from '../../services/seo';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);
  featuredProducts = inject(ProductService).getFeaturedProducts();

  ngOnInit() {
    this.seo.updateTitle('Exceptional Fragrances');
    this.seo.updateMeta('Discover Luminaire, a luxury fragrance brand inspired by nature and refined by art.');
  }
}
