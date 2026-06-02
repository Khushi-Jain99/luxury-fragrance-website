import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export class OrderSuccessComponent implements OnInit {
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);

  orderId = signal('');

  ngOnInit(): void {
    this.seo.updateTitle('Order Placed');
    this.seo.updateMeta('Your luxury fragrance order has been placed successfully.');
    this.orderId.set(this.route.snapshot.queryParamMap.get('orderId') ?? '');
  }
}
