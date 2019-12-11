import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
    measureList: Observable<any>;
    categoryList: Observable<any>;
    productList: Observable<any>;
    isLoading = false;
    productForm: FormGroup;
    errorsMap: Map<string, string>;
    errorsObj: any;
    submitted = false;
    productName$: Subject<string> = new Subject();
    nameExists = false;
    closeResult = '';
    product: any;

    constructor(
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private modalService: NgbModal
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
        this.productList = this.productService.getAllProduct();
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
        this.submitted = false;
    }

    updateProduct(formValue: any): void {
        console.log(formValue);
        alert(JSON.stringify(formValue));
    }
    get f() {
        return this.productForm.controls;
    }
    checkName(val: string): void {
        if (val) {
            this.productService.isProductNameExists(val).subscribe(res => {
                this.nameExists = res;
            });
        }
    }
    deleteProduct(id: number): void {
        this.productService.removeProduct(id).subscribe(res => {
            if (res.error) {
                this.sharedService.buildAlert('Error', res.errMessage, 'error');
                return;
            }
            this.sharedService.buildAlert('Success', res.msg, 'success');
            this.retriveAllProduct();
        });
    }
    retriveAllCategories(): void {
        this.categoryList = this.productService.getAllCategories();
    }
    retriveAllProduct(): void {
        this.productList = this.productService.getAllProduct();
    }
    retriveAllMeasurements(): void {
        this.measureList = this.productService.getAllMeasurements();
    }

    open(content: any, productId: number) {
        this.getProduct(productId);
        this.modalService.open(content, { size: 'lg' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    getProduct(id: number): void {
        this.productService.retriveProductById(id).subscribe(
            res => {
                this.product = res;
            },
            err => this.sharedService.buildAlert('Error', err, 'error')
        );
    }
}
