import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getHeaders, getBaseUrl } from './utils';
import { Product, ProductOptions } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  headers: any;
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.headers = getHeaders();
    this.baseUrl = getBaseUrl();
  }

  getProducts(queryParam?: ProductOptions) {
    const complement = queryParam ? `?label=${queryParam}` : '';
    const url = `${this.baseUrl}/product${complement}`;
    return this.http.get(url);
  }

  getProduct(id: string) {
    const url = `${this.baseUrl}/product/` + id;
    return this.http.get(url);
  }

  createProduct(product: Product) {
    const url = `${this.baseUrl}/product`;
    return this.http.post(url, { ...product }, this.headers);
  }

  updateProduct(id: string, attrs: any) {
    const url = `${this.baseUrl}/product/` + id;
    return this.http.put(url, attrs, this.headers);
  }

  deleteProduct(id: string) {
    const url = `${this.baseUrl}/product/` + id;
    return this.http.delete(url, this.headers);
  }
}
