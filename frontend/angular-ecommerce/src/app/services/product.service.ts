import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClint: HttpClient){}

  private baseUrl = 'http://localhost:8081/api/products'

  getProductList(theCategoryId: number): Observable<Product[]>{

    // @TODO: need to biuld the urlBase BK
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    

    return this.httpClint.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

}
interface GetResponse{
  _embedded: {
    products: Product[];
  }
}
