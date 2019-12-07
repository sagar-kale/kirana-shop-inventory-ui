import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { User } from './user';
import Swal from 'sweetalert2';

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
    constructor(
        private formBuilder: FormBuilder,
        private regService: RegistrationService
    ) {
        this.registerForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            repeatPassword: ['', Validators.required]
        });
    }

    ngOnInit() {}

    onSubmit(): void {
        this.regService
            .registerUser(this.registerForm.value)
            .subscribe(data => {
                this.user = data.entity;
                Swal.fire(
                    'Success',
                    'Registration successfull for user name : ' +
                        this.user.email,
                    'success'
                );
            });
        this.registerForm.reset();
    }
}
