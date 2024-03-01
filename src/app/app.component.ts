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
  
  ngOnInit():void {
    this.subscription = this.productsService.getProducts().subscribe((products:Product[]) => {
      this.products$ = products;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
