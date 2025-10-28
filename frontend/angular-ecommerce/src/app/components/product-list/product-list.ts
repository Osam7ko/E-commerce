import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  constructor(private productService: ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {

    // check if "id" parameter is avalibale
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if( hasCategoryId){
      // get the "id" param string, convert string to number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }

    // now get the products for the givin id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
