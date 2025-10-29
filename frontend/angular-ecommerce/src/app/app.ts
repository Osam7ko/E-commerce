import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenu } from "./components/product-category-menu/product-category-menu";
import { Search } from "./components/search/search";

@Component({
  selector: 'app-root',
  imports: [
    HttpClientModule,
    RouterOutlet,
    ProductCategoryMenu,
    Search
],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [ProductService]
})
export class App {
  protected readonly title = signal('angular-ecommerce');
}
