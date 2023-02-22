import { Component, OnInit } from '@angular/core';
import { Product, ProductOptions } from '../../interfaces/Product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  responsiveOptions: any[] = [];
  constructor(private productsService: ProductsService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.productsService
      .getProducts(ProductOptions.Merch)
      .subscribe((resp: any) => {
        this.products = resp.products;
      });
  }
}
