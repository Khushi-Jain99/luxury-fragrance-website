import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart';
import { Product, ProductService } from '../../services/product';
import { OrderService, OrderProduct } from '../../services/order';
import { SeoService } from '../../services/seo';
import { ImgFallbackDirective } from '../../directives/img-fallback';

interface CheckoutItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ImgFallbackDirective],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class CheckoutComponent implements OnInit {
  private seo = inject(SeoService);
  private products = inject(ProductService);
  private cart = inject(CartService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);

  submitting = signal(false);
  errorMessage = signal('');

  shippingForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    pincode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
  });

  paymentMethod = signal<string>('cod');

  cartItems = computed<CheckoutItem[]>(() => {
    return this.cart.entries().map((entry) => {
      const product = this.products.getProductById(entry.productId);
      return product
        ? { product, quantity: entry.quantity, subtotal: product.price * entry.quantity }
        : null;
    }).filter((item): item is CheckoutItem => item !== null);
  });

  total = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.subtotal, 0)
  );

  totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  ngOnInit(): void {
    this.seo.updateTitle('Checkout');
    this.seo.updateMeta('Complete your luxury fragrance order.');
    if (this.cart.entries().length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  selectPayment(method: string): void {
    this.paymentMethod.set(method);
  }

  placeOrder(): void {
    if (this.shippingForm.invalid || this.submitting()) return;

    this.submitting.set(true);
    this.errorMessage.set('');

    const orderProducts: OrderProduct[] = this.cartItems().map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      brand: item.product.brand,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    this.orderService.placeOrder({
      products: orderProducts,
      totalPrice: this.total(),
      shippingDetails: this.shippingForm.value,
      paymentMethod: this.paymentMethod(),
    }).subscribe({
      next: (res) => {
        this.cart.clear();
        this.router.navigate(['/order-success'], {
          queryParams: { orderId: res.order._id },
        });
      },
      error: () => {
        this.submitting.set(false);
        this.errorMessage.set('Something went wrong. Please try again.');
      },
    });
  }
}
