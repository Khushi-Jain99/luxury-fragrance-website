import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { SeoService } from '../../services/seo';
import { ProductCard } from '../../components/product-card/product-card';
import { ImgFallbackDirective } from '../../directives/img-fallback';

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule, ProductCard, ImgFallbackDirective],
  templateUrl: './women.html',
  styleUrl: './women.scss',
})
export class WomenComponent implements OnInit {
  private seo = inject(SeoService);
  products = inject(ProductService).getProductsByCategory('Women');

  ngOnInit() {
    this.seo.updateTitle("Women's Collection");
    this.seo.updateMeta("Discover our elegant fragrance collection for women. From floral bouquets to oriental ambers.");
  }
}
