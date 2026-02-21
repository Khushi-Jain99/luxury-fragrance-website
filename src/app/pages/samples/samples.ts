import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { SeoService } from '../../services/seo';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-samples',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './samples.html',
  styleUrl: './samples.scss',
})
export class SamplesComponent implements OnInit {
  private seo = inject(SeoService);
  products = inject(ProductService).getProductsByCategory('Sample');

  ngOnInit() {
    this.seo.updateTitle('Discovery Sets & Samples');
    this.seo.updateMeta('Find your signature scent with our discovery sets and individual samples.');
  }
}
