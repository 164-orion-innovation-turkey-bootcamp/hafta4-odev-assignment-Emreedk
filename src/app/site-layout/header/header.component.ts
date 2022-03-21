import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartserviceService } from 'src/app/cartservice.service';
import { ProductService } from 'src/app/products/product.service';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;
  public searchText!: string;
  loginUser;
  cartCount: number = 0;
  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartserviceService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.userDataService.login.subscribe((status) => {
        this.isUserLoggedIn = status; //jxJs subject trigger'dan dönen observable'ı aldım.
      });
    } else {
      if (localStorage.getItem('user')) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = null;
      }
    }
    this.loginUser = localStorage.getItem('user');

    if (JSON.parse(this.loginUser)?.id === 1) {
      this.isAdmin = true;
      // console.log(this.isAdmin);
    }
    // this.addToCart();

    this.cartService.cartCount.subscribe((res) => {
      this.addToCart();
      console.log(res);
    });

    this.cartService.cartCountMinus.subscribe((res) => {
      this.addToCart();
    });
  }
  onLogOut() {
    localStorage.removeItem('user');
    this.userDataService.login.next(false);
    this.router.navigate(['/home']);
  }

  search(data: any) {
    this.searchText = (data.target as HTMLInputElement).value;
    this.productService.search.next(this.searchText);
  }

  addToCart() {
    this.cartService.getCarts().subscribe((cartData) => {
      let newCartCount = 0;
      cartData.forEach((cartElement) => {
        if (cartElement.userId == JSON.parse(localStorage.getItem('user')).id) {
          console.log(cartData.length);
          newCartCount++;
        }
      });
      this.cartCount = newCartCount;
    });
  }
}
