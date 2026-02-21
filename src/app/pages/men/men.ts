import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { SeoService } from '../../services/seo';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './men.html',
  styleUrl: './men.scss',
})
export class MenComponent implements OnInit {
  private seo = inject(SeoService);
  products = inject(ProductService).getProductsByCategory('Men');

  ngOnInit() {
    this.seo.updateTitle("Men's Collection");
    this.seo.updateMeta("Explore our sophisticated fragrance collection for men. From woody ouds to fresh citrus.");
  }
}
