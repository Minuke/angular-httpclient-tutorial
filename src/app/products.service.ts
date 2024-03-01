import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient)

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>('https://fakestoreapi.com/products?limit=5');
  }

}
