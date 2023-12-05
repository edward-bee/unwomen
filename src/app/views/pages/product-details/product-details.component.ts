import { ProductDetailsService } from '../../../../Service/product-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  uid!: string;
  productDetails: any;
  productImages: any[] = [];
  activeImageIndex = 0;

  constructor(
    private route: ActivatedRoute, // Include ActivatedRoute in the constructor
    private productDetailsService: ProductDetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.uid = params.get('uid') ?? '';
          return this.productDetailsService.getProductByUid(this.uid);
        })
      )
      .subscribe((productDetailsData) => {
        this.productDetails = productDetailsData;
        this.productImages = this.productDetails.ProductImages;
        console.log('Product details data', this.productDetails);
      });
  }

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
    console.log(index);
    
  }
}
