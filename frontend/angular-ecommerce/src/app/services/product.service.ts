import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClint: HttpClient) {}

  private baseUrl = 'http://localhost:8081/api/products';
  private categoryURL = 'http://localhost:8081/api/product-category';

  getProductList(theCategoryId: number): Observable<Product[]> {
    // @TODO: need to biuld the urlBase BK
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClint
      .get<GetResponseProductsCategory>(this.categoryURL)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClint
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
