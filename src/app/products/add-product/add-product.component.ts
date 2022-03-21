import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
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
  }
  onSubmit() {
    if (this.addProductForm.valid) {
      const newProduct = {
        name: this.addProductForm.get('name').value,
        categoryId: this.addProductForm.get('categoryId').value,
        description: this.addProductForm.get('description').value,
        price: Number(this.addProductForm.get('price').value),
        productImg: 'noproduct.jpg',
      };
      // console.log(newProduct);
      this.productService.createProduct(newProduct).subscribe((data) => {
        console.log(data);
      });
      this.router.navigate(['/products']);
    }
  }
}
