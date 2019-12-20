import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {
    customerList: Observable<any>;
    isLoading = false;
    customerForm: FormGroup;
    errorsMap: Map<string, string>;
    errorsObj: any;
    submitted = false;
    custmerName$: Subject<string> = new Subject();
    nameExists = false;
    closeResult = '';
    customerIdUpdate = null;
    btnSaveUpdateTitle = 'save';
    pTabTitle = 'Add Product';
    btnSavingUpdatingTitle = 'Saving Product';
    isNew = true;
    message: string;
    page = 1;
    size = 0;
    maxSize = 0;
    pageSize = 4;

    constructor(
        private fb: FormBuilder,
        private formBuilder: FormBuilder,
        private customerService: CustomerService,
        private sharedService: SharedService
    ) {}

    ngOnInit(): void {
        this.customerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    ngAfterViewInit(): void {
        this.custmerName$
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(value => this.checkName(+value));
        this.loadDefaults();
    }

    loadDefaults() {
        this.customerService
            .getAllCustomers(this.page - 1, this.pageSize)
            .subscribe(res => {
                this.customerList = res.content.map((c, i) => ({
                    idd: i + 1,
                    ...c
                }));
                this.size = res.totalElements;
                this.maxSize = res.totalPages;
            });
    }

    onSubmit() {
        this.submitted = true;
        if (this.customerForm.invalid) {
            return;
        }
        this.createCustome(this.customerForm.value);
    }

    createCustome(customer: Customer) {
        if (this.customerIdUpdate == null) {
            console.log('creating new customer::: ', customer);
            this.customerService.saveCustomer(customer).subscribe(res => {
                this.message = 'User Added Successfully';
                this.loadDefaults();
                console.log(res);
                this.clearForm();
                console.log('submitted');
            });
        } else {
            console.log('updating existing user:: ', customer);
            customer.id = this.customerIdUpdate;
            this.customerService.updateCustomer(customer).subscribe(data => {
                this.message = 'Record Updated Successfully';
                this.loadDefaults();
                this.customerIdUpdate = null;
                this.isNew = true;
                console.log('updated customer :: ', data);
                this.clearForm();
            });
        }
    }

    loadCustToEdit(custId: number) {
        this.customerService.retriveCustomerById(custId).subscribe(customer => {
            this.message = null;
            this.isNew = false;
            this.customerIdUpdate = customer.id;
            this.customerForm.patchValue(customer);
            // this.userForm.controls['name'].setValue(user.name);
            // this.userForm.controls['age'].setValue(user.age);
            // this.userForm.controls['email'].setValue(user.email);
            // this.userForm.controls['city'].setValue(user.city);
        });
    }

    deleteCustomer(id: number): void {
        this.customerService.removeCustomer(id).subscribe(
            res => {
                this.sharedService.buildAlert(
                    'Success',
                    'Record Deleted',
                    'success'
                );
                this.loadDefaults();
            },
            err => {
                this.sharedService.displayError(
                    'Error Occurred while deleting customer'
                );
            }
        );
    }
    checkName(id: number): void {
        if (id) {
            this.customerService.isCustExists(id).subscribe(res => {
                this.nameExists = res;
            });
        }
    }

    clearForm() {
        this.submitted = false;
        this.customerForm.reset();
    }
}
