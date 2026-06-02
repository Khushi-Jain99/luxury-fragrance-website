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
  successMessage = signal('');

  shippingForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    pincode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
  });

  upiForm: FormGroup = this.fb.group({
    upiId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9]{2,}$/)]],
    upiApp: ['', [Validators.required]],
    upiMobile: ['', [Validators.pattern(/^\d{10}$/)]],
  });

  paymentMethod = signal<'COD' | 'UPI' | 'CARD'>('COD');

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
    if (method === 'COD' || method === 'UPI' || method === 'CARD') {
      this.paymentMethod.set(method);
    }
  }

  placeOrder(): void {
    if (this.submitting()) return;

    if (this.cartItems().length === 0) {
      this.errorMessage.set('Your cart is empty. Add items before placing an order.');
      return;
    }

    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      this.errorMessage.set('Please complete all required shipping details.');
      return;
    }

    if (this.paymentMethod() === 'UPI' && this.upiForm.invalid) {
      this.upiForm.markAllAsTouched();
      this.errorMessage.set('Please enter valid UPI payment details.');
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const orderProducts: OrderProduct[] = this.cartItems().map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      brand: item.product.brand,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    const isUpi = this.paymentMethod() === 'UPI';

    this.orderService.placeOrder({
      products: orderProducts,
      totalPrice: this.total(),
      shippingDetails: this.shippingForm.value,
      paymentMethod: this.paymentMethod(),
      upiId: isUpi ? this.upiForm.value.upiId : undefined,
      upiApp: isUpi ? this.upiForm.value.upiApp : undefined,
    }).subscribe({
      next: (res) => {
        if (isUpi) {
          this.successMessage.set('Payment successful. Placing your order now...');
        }
        this.cart.clear();
        const navigate = () => {
          this.router.navigate(['/order-success'], {
            queryParams: { orderId: res.order._id },
          });
        };

        if (isUpi) {
          setTimeout(navigate, 350);
        } else {
          navigate();
        }
      },
      error: (err) => {
        this.submitting.set(false);
        const message = err?.error?.message || 'Something went wrong. Please try again.';
        this.errorMessage.set(message);
      },
    });
  }
}
