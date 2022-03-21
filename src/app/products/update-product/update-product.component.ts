import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  productId: number = 0;
  updateProductForm: FormGroup;
  productDetails: Product;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateProductForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      categoryId: new FormControl(null, [Validators.required]),

      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),

      price: new FormControl(null, [Validators.required]),
    });

    this.activatedRoute.params.subscribe((data) => {
      this.productId = data['id'];

      this.productService
        .viewProduct(this.productId)
        .subscribe((productData) => {
          this.productDetails = productData;

          this.updateProductForm.patchValue({
            name: this.productDetails.name,
            categoryId: this.productDetails.categoryId,
            description: this.productDetails.description,
            price: this.productDetails.price,
          });
        });
    });
  }
  onSubmit() {
    const updateProduct = {
      name: this.updateProductForm.get('name').value,
      categoryId: this.updateProductForm.get('categoryId').value,
      description: this.updateProductForm.get('description').value,
      price: this.updateProductForm.get('price').value,
      productImg: 'noproduct.jpg',
    };

    this.productService
      .updateProduct(this.productId, updateProduct)
      .subscribe((data) => {
        console.log(data);
      });
    this.router.navigate(['/products']);
  }
}
