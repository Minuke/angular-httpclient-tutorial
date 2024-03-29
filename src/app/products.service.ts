import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient);

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>('https://fakestoreapi.com/products?limit=4');
  }

  addProduct(product:Product): Observable<Product> {
    return this.http.post<Product>('https://fakestoreapi.com/products', product);
  }

  updateProduct(product: Product): Observable<Product> {
      return this.http.put<Product>(`https://fakestoreapi.com/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`https://fakestoreapi.com/products/${id}`);
  }

}
