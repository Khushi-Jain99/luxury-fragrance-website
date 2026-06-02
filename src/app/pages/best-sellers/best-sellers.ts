import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { SeoService } from '../../services/seo';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './best-sellers.html',
  styleUrl: './best-sellers.scss',
})
export class BestSellersComponent implements OnInit {
  private seo = inject(SeoService);
  private products = inject(ProductService);

  bestSellers = this.products.getBestSellers();

  ngOnInit(): void {
    this.seo.updateTitle('Best Sellers');
    this.seo.updateMeta('Shop our most-loved luxury fragrances — iconic signatures adored by collectors worldwide.');
  }
}
