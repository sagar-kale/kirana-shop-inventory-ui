import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    Output,
    EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Customer, TYPE } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
    measureList: Observable<any>;
    categoryList: Observable<any>;
    productList: Observable<any>;
    customerList: Customer[];
    isLoading = false;
    productForm: FormGroup;
    errorsMap: Map<string, string>;
    errorsObj: any;
    submitted = false;
    productName$: Subject<string> = new Subject();
    nameExists = false;
    closeResult = '';
    productIdUpdate = null;
    btnSaveUpdateTitle = 'save';
    pTabTitle = 'Purchase Product';
    btnSavingUpdatingTitle = 'Saving Product';
    isNew = true;
    @Output() pChange = new EventEmitter<boolean>();

    constructor(
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private modalService: NgbModal,
        private customerService: CustomerService
    ) {
        this.productForm = this.formBuilder.group({
            productName: ['', Validators.required],
            qty: ['', Validators.required],
            purchasePrice: ['', Validators.required],
            salePrice: ['', Validators.required],
            catId: ['', Validators.required],
            measure: ['', Validators.required],
            customer: [null, Validators.required],
            desc: ['']
        });
    }

    ngOnInit() {}
    ngAfterViewInit(): void {
        this.measureList = this.productService.getAllMeasurements();
        this.categoryList = this.productService.getAllCategories();
        this.productList = this.productService.getAllProduct();
        this.customerService.getAllCustomers().subscribe(res => {
            this.customerList = res.content.filter(
                c => c.type === TYPE.WHOLESALER
            );
        });
        this.productName$
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(value => this.checkName(value));
    }
    ngOnDestroy(): void {
        this.productName$.complete();
    }
    onSubmit() {
        this.submitted = true;
        this.isLoading = true;
        this.productForm.controls.customer.setValue({
            id: this.productForm.controls.customer.value
        });
        if (this.productForm.invalid) {
            return;
        }
        this.isNew = true;
        this.saveProduct(this.productForm.value);
    }

    saveProduct(product: Product) {
        this.errorsMap = null;
        console.log(product);
        if (this.productIdUpdate === null) {
            this.productService.saveProduct(product).subscribe(
                res => {
                    if (res.error) {
                        this.sharedService.displayError(res.errMessage);
                        return;
                    } else if (res.validationError) {
                        this.isLoading = false;
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
                    this.pChange.emit(true);
                    this.clearForm();
                },
                err => {
                    this.clearForm();
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
        } else {
            console.log('updating existing product...', this.productIdUpdate);
            console.log(product);
            product.id = this.productIdUpdate;

            this.productService.updateProduct(product).subscribe(
                res => {
                    if (res.error) {
                        this.sharedService.displayError(res.errMessage);
                        return;
                    } else if (res.validationError) {
                        this.isLoading = false;
                        this.errorsObj = res.validationErrors;
                        this.errorsMap = this.errorsObj;
                        for (const key of Object.keys(res.validationErrors)) {
                            this.productForm.controls[key].setErrors({
                                incorrect: true
                            });
                        }
                        return;
                    }
                    this.sharedService.buildAlert(
                        'update',
                        'Update Sucesfull',
                        'success'
                    );
                    this.pChange.emit(true);
                    this.clearForm();
                },
                err => {
                    this.sharedService.displayError(JSON.stringify(err));
                }
            );
        }
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
            this.pChange.emit(true);
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
        // this.getProduct(productId);
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

    loadProductToEdit(id: number): void {
        this.productService.retriveProductById(id).subscribe(
            res => {
                this.isNew = false;
                this.btnSaveUpdateTitle = 'Update';
                this.pTabTitle = 'Update Product';
                this.btnSavingUpdatingTitle = 'Updating Product';
                this.productIdUpdate = res.id;
                this.productForm.patchValue(res);
            },
            err => this.sharedService.buildAlert('Error', err, 'error')
        );
    }
    clearForm() {
        this.submitted = false;
        this.isNew = true;
        this.isLoading = false;
        this.btnSaveUpdateTitle = 'save';
        this.pTabTitle = 'Add Product';
        this.btnSavingUpdatingTitle = 'Saving Product';
        this.productForm.reset();
        this.productIdUpdate = null;
    }
}
