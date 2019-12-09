import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductService } from './product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
    measureList: Observable<any>;
    categoryList: Observable<any>;
    private loading = false;

    constructor(private productService: ProductService) {}

    ngOnInit() {}
    ngAfterViewInit(): void {
        this.loading = true;
        this.measureList = this.productService.getAllMeasurements();
        this.categoryList = this.productService.getAllCategories();
    }
}
