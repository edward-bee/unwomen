// business.component.ts
import { Component, OnInit } from '@angular/core';
import { AllProductService } from '../../../../Service/all-product.service';
import { CookieService } from './cookie.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})

export class BusinessComponent implements OnInit {
  products: any;
  currentProductView: string | null = null;
  
  constructor(
    private allProductService: AllProductService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    // Load products and set initial view from the cookie
    this.loadProducts();
  }

  loadProducts() {
    this.allProductService.getDistinctProducts().subscribe((data) => {
      this.products = data;
      console.log('this is the product Data', data);

      // Set initial view from the cookie
      this.currentProductView = this.cookieService.getCookie("currentProductView") || 'grid';
    });
  }

  setProductView(view: string) {
    // Set the view in the component and in the cookie
    this.currentProductView = view;
    this.cookieService.setCookie("currentProductView", view, 7);
  }
}
