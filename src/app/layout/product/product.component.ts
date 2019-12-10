import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
    errorsMap: Map<string, string>;
    errorsObj: any;
    submitted = false;
    productName$: Subject<string> = new Subject();
    nameExists = false;

    constructor(
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private sharedService: SharedService
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
        this.productName$
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(value => this.checkName(value));
    }
    saveProduct() {
        this.isLoading = true;
        this.submitted = true;
        this.errorsMap = null;

        this.productService.saveProduct(this.productForm.value).subscribe(
            res => {
                this.isLoading = false;
                if (res.error) {
                    this.sharedService.displayError(res.errMessage);
                    return;
                } else if (res.validationError) {
                    this.errorsObj = res.validationErrors;
                    this.errorsMap = this.errorsObj;
                    for (const key of Object.keys(res.validationErrors)) {
                        this.productForm.controls[key].setErrors({
                            incorrect: true
                        });
                    }
                    return;
                }
                this.sharedService.displaySuccessMsg(res.msg);
                this.productForm.reset();
            },
            err => {
                this.isLoading = false;
                console.log(err);
                if (err.status === 0) {
                    this.sharedService.buildHtmlAlert(
                        'Error',
                        `Please check spring boot application is runnning or not <br><small> ${err.message}</small>`,
                        'error'
                    );
                    return;
                }
                this.sharedService.buildHtmlAlert('Error', err, 'error');
            }
        );
    }
    get f() {
        return this.productForm.controls;
    }
    checkName(val: string) {
        this.productService.isProductNameExists(val).subscribe(res => {
            this.nameExists = res;
        });
    }
}
