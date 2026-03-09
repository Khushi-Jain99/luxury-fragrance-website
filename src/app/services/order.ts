import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderProduct {
  productId: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderPayload {
  products: OrderProduct[];
  totalPrice: number;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
}

export interface OrderResponse {
  message: string;
  order: {
    _id: string;
    products: OrderProduct[];
    totalPrice: number;
    shippingDetails: ShippingDetails;
    paymentMethod: string;
    orderStatus: string;
    createdAt: string;
  };
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);

  placeOrder(order: OrderPayload): Observable<OrderResponse> {
    return this.http.post<OrderResponse>('/api/orders', order);
  }
}
