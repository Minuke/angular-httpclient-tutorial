import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './products.service';
import { CommonModule } from '@angular/common';
import { Product } from './product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private productsService = inject(ProductsService);
  private subscription!: Subscription;
  public products$!: Product[];
  public mockProduct: Product = {
    id: 0,
    title: 'Test product',
    price: 99.99,
    description: 'This is a test product',
    category: 'Test',
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
  };
  
  ngOnInit():void {
    this.getProducts();
  }

  getProducts(): void {
    this.subscription = this.productsService.getProducts().subscribe((products: Product[]) => {
        this.products$ = products;
    });
}

  addProduct(){
    this.productsService.addProduct(this.mockProduct).subscribe((product:Product)=> {
      this.products$.push(product);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
