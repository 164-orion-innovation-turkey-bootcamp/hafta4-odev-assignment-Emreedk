import { Component, OnInit } from '@angular/core';
import { CartserviceService } from 'src/app/cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  loginUser;
  userCart = [];
  isEmpty = false;
  totalPrice: number = 0;
  orderList: any;

  constructor(private cartService: CartserviceService) {}

  ngOnInit(): void {
    this.getCart();
    this.totalPrices();
    this.cartService.cartCountMinus.subscribe((res) => {
      this.getCart();
    });

    this.cartService.getCarts().subscribe((cartItems) => {
      const newOrderList = [];
      cartItems.forEach((orderElement) => {
        if (
          orderElement.userId == JSON.parse(localStorage.getItem('user')).id
        ) {
          newOrderList.push(orderElement);
        }
      });
      this.orderList = newOrderList;
    });
  }

  onDelete(cartItemId) {
    this.cartService.deleteCartItem(cartItemId).subscribe((deletedData) => {
      this.cartService.cartCountMinus.next(true);
      this.totalPrices();
      if (this.totalPrice == 0) {
        this.isEmpty = false;
      }
    });
  }

  getCart() {
    this.cartService.getCarts().subscribe((cartData) => {
      this.userCart = [];

      cartData.forEach((cartElement) => {
        if (cartElement.userId == JSON.parse(localStorage.getItem('user')).id) {
          this.userCart.push(cartElement);
          if (this.userCart.length > 0) {
            this.isEmpty = true;
          }
        }
      });
    });
  }

  getBuy() {
    // console.log(this.orderList);
    const newUserOrders = [];
    this.orderList.forEach((orderListElement) => {
      const userOrders = {
        productId: orderListElement.productId,
        cartId: orderListElement.id,
        userId: orderListElement.userId,
      };

      newUserOrders.push(userOrders);
      this.onDelete(orderListElement.id);
    });
    this.cartService.addToOrderList(newUserOrders).subscribe((res) => {
      console.log(res);
    });
  }

  totalPrices() {
    this.totalPrice = 0;
    this.cartService.getCarts().subscribe((res) => {
      res.forEach((element) => {
        if (element.userId == JSON.parse(localStorage.getItem('user')).id) {
          this.totalPrice += element.price;
        }
      });
    });
  }
}
