import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css',
})
export class CartDetails implements OnInit {
  cartItem: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    // get a handle to the cart item
    this.cartItem = this.cartService.cartItems;
    // subsecribe to the cart totalPrice

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    // compute cart total price  and quantity
    this.cartService.computeCartTotals();
  }

  dncrementQuantity(theCartItem: CartItem) {
    this.cartService.removeItemFromCart(theCartItem);
  }
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }
  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
