import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartserviceService } from 'src/app/cartservice.service';
import { UserDataService } from 'src/app/user-data.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  productID = 0;
  productData: Product;
  isAdmin: boolean = false;
  productList: any;
  loginUser;
  cartProduct;
  userCart: [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.productID = data['id'];
    });
    this.productService.viewProduct(this.productID).subscribe((viewData) => {
      this.productData = viewData;
    });

    this.productService.viewAllProduct().subscribe((data) => {
      this.productList = data;
    });

    this.loginUser = localStorage.getItem('user');

    if (JSON.parse(this.loginUser).id === 1) {
      this.isAdmin = true;
    }
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
    this.cartService.addtoCart(userCart).subscribe((response) => {});
  }

  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe((deletedData) => {
      this.router.navigate(['/products']);
    });
  }
}
