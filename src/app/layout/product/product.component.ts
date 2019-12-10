import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductService } from './product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
    measureList: Observable<any>;
    categoryList: Observable<any>;
    isLoading = false;
    saveBtnTitle = 'Save Product';
    productForm: FormGroup;

    constructor(
        private productService: ProductService,
        private formBuilder: FormBuilder
    ) {
        this.productForm = this.formBuilder.group({
            productName: ['', Validators.required],
            qty: ['', Validators.required],
            purchasePrice: ['', Validators.required],
            salePrice: ['', Validators.required],
            catId: ['', Validators.required],
            measure: ['', Validators.required],
            desc: ['']
        });
    }

    ngOnInit() {}
    ngAfterViewInit(): void {
        this.measureList = this.productService.getAllMeasurements();
        this.categoryList = this.productService.getAllCategories();
    }
    saveProduct() {
        this.isLoading = true;
        setTimeout(() => {
            Swal.fire('', JSON.stringify(this.productForm.value), 'success');
            this.isLoading = false;
            this.productForm.reset();
        }, 5000);
    }
}
