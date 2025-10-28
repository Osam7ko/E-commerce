import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [
    HttpClientModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [ProductService]
})
export class App {
  protected readonly title = signal('angular-ecommerce');
}
