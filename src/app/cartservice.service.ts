import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  cartCount = new Subject<boolean>();
  cartCountMinus = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {}

  addtoCart(cart) {
    return this.httpClient.post('http://localhost:3000/carts/', cart);
  }
  getCarts() {
    return this.httpClient.get('http://localhost:3000/carts/').pipe(
      map((response) => {
        const newArray = [];
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            newArray.push(response[key]);
          }
        }
        return newArray;
      })
    );
  }

  deleteCartItem(cartItemId) {
    const baseUrl = 'http://localhost:3000/carts/' + cartItemId;
    return this.httpClient.delete(baseUrl);
  }

  addToOrderList(order) {
    return this.httpClient.post('http://localhost:3000/orders/', order);
  }
}
