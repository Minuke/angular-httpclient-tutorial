import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './products.service';
import { CommonModule } from '@angular/common';
import { Product } from './product.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private productsService = inject(ProductsService);
  private unsubscribe$ = new Subject<void>();
  public products$!: Product[];
  public activeScroll = false;
  public mockProduct: Product = {
    id: 0,
    title: 'Test product',
    price: 99.99,
    description: 'This is a test product',
    category: 'Test',
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
  };
  
  @ViewChild('productElement', { read: ElementRef, static: false }) productElement!: ElementRef;
  
  ngOnInit():void {
    this.getProducts();

  }

  ngAfterViewChecked() {
    if(this.productElement){
      this.productElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getProducts(): void {
    this.productsService.getProducts()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((products: Product[]) => {
        this.products$ = products;
    });
  }

  addProduct():void {
    this.activeScroll = true;
    this.productsService.addProduct(this.mockProduct)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((product:Product)=> {
      this.generateNewDataProduct(product);
      
      this.products$.push(product);
    });
  }

  generateNewDataProduct(product:Product): void {
    let randomNumber = Math.floor(Math.random() * 500) + 21;
    product.id = randomNumber;
    product.image = `https://picsum.photos/250?random=${randomNumber}`
  }

  updateProduct(product:Product):void {
    this.activeScroll = false;
    product.title = "UPDATE";
    this.productsService.updateProduct(product);
  }

  deleteProduct(product: Product):void {
    this.activeScroll = false;
    this.productsService.deleteProduct(product.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
        this.products$ = this.products$.filter(p => p.id !== product.id);
    });
  }

  ngOnDestroy():void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
