import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';

export const routes: Routes = [
  { path: 'category/:id/:name', component: ProductList },
  { path: 'category', component: ProductList },
  { path: 'products', component: ProductList },
  { path: 'search/:keyword', component: ProductList },
  { path: 'products/:id', component: ProductDetails },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
  { path: 'search/:keyword', component: ProductList },
];
