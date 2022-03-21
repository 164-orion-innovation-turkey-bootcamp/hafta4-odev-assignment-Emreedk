import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../site-layout/category';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public search = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {}

  createProduct(productBody): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products';
    return this.httpClient.post<Product>(baseUrl, productBody);
  }
  viewProduct(productId): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/' + productId;
    return this.httpClient.get<Product>(baseUrl);
  }
  viewAllProduct(): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/';
    return this.httpClient.get<Product>(baseUrl);
  }
  updateProduct(productID, productBody): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/' + productID;
    return this.httpClient.put<Product>(baseUrl, productBody);
  }
  deleteProduct(productID): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/' + productID;
    return this.httpClient.delete<Product>(baseUrl);
  }

  searchCategoryProduct(categoryID): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products?categoryId=' + categoryID;
    return this.httpClient.get<Product>(baseUrl);
  }
  getCategory() {
    const categoryUrl = 'http://localhost:3000/categories';
    return this.httpClient.get<Category>(categoryUrl);
  }
}
