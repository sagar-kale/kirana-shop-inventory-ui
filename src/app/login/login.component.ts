import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { RegistrationService } from '../signup/registration.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        public router: Router,
        private loginService: RegistrationService,
        private formBuilder: FormBuilder
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {}

    onLoggedin() {
        this.loginService.loginUser(this.loginForm.value).subscribe(
            response => {
                console.log(response);
                if (response.error) {
                    Swal.fire('Error', response.errMessage, 'error');
                    this.loginForm.reset();
                    return;
                }
                localStorage.setItem('isLoggedin', response.entity.logged);
                localStorage.setItem(
                    'username',
                    response.entity.loggedInUser.fullName
                );
                this.router.navigate(['/dashboard']);
            },
            err => console.log(err)
        );
    }
}
