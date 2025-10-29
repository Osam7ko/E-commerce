import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenu } from "./components/product-category-menu/product-category-menu";

@Component({
  selector: 'app-root',
  imports: [
    HttpClientModule,
    RouterOutlet,
    ProductCategoryMenu
],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [ProductService]
})
export class App {
  protected readonly title = signal('angular-ecommerce');
}
