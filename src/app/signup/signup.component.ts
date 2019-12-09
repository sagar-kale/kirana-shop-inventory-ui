import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import { routerTransition } from '../router.animations';
import { SharedService } from '../shared/services/shared.service';
import { RegistrationService } from './registration.service';
import { User } from './user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    user: User;
    message: string;
    closed = false;
    submitted = false;
    loading = false;
    errors: { fullName: string; email: string; password: string };
    constructor(
        private formBuilder: FormBuilder,
        private regService: RegistrationService,
        private loader: SharedService
    ) {
        this.registerForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            email: ['', Validators.required, this.checkValidEmail],
            password: ['', Validators.required],
            repeatPassword: ['', Validators.required]
        });
    }

    ngOnInit() {}

    get f() {
        return this.registerForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        this.loading = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.regService.registerUser(this.registerForm.value).subscribe(
            data => {
                this.loading = false;
                console.log(data);
                if (data.error) {
                    Swal.fire('Error', data.errMessage, 'success');
                    return;
                } else if (data.validationError) {
                    this.errors = data.validationErrors;
                    return;
                }
                this.user = data.entity;
                this.regService.buildAlert(
                    'sucess',
                    'Registration successfull for user name : ' +
                        this.user.email,
                    'success'
                );
            },
            err => {
                this.loading = false;
                console.log(err);
                if (err.status === 0) {
                    this.regService.buildHtmlAlert(
                        'Error',
                        `Please check spring boot application is runnning or not <br><small> ${err.message}</small>`,
                        'error'
                    );
                    return;
                }
                this.regService.buildHtmlAlert('Error', err, 'error');
            }
        );
        this.registerForm.reset();
    }
    onEditing(value: any): void {
        if (this.errors) {
            this.errors[value.target.attributes.formcontrolname.value] = null;
        }
    }
    checkValidEmail(control: AbstractControl) {
        const emailPat = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
        return new Promise((res, rej) => {
            if (emailPat.test(control.value)) {
                res(null); // return null means validation pass
            } else {
                res({ vaild: false }); // failed with message
            }
        });
    }
}
