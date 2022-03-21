import { Component, OnInit } from '@angular/core';
import { CartserviceService } from 'src/app/cartservice.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.css'],
})
export class ViewAllProductComponent implements OnInit {
  productList: any;
  loginUser;
  cartProduct;
  userCart: [];
  searchText: string;

  constructor(
    private productService: ProductService,
    private cartService: CartserviceService
  ) {}

  ngOnInit(): void {
    this.productService.viewAllProduct().subscribe((data) => {
      this.productList = data;
    });

    this.productService.search.subscribe((data: any) => {
      this.searchText = data;
    });

    this.loginUser = localStorage.getItem('user');
  }

  addtoCart(productId) {
    this.productList.forEach((product) => {
      if (product.id == productId) {
        this.cartProduct = product;
      }
    });
    const userCart = {
      productId: this.cartProduct.id,
      name: this.cartProduct.name,
      categoryId: this.cartProduct.categoryId,
      description: this.cartProduct.description,
      price: this.cartProduct.price,
      productImg: this.cartProduct.productImg,
      userId: JSON.parse(this.loginUser).id,
    };
    this.cartService.addtoCart(userCart).subscribe((response) => {
      console.log(response);
      this.cartService.cartCount.next(true);
    });
  }
}
