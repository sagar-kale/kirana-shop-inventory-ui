import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { routerTransition } from '../router.animations';
import { SharedService } from '../shared/services/shared.service';
import { RegistrationService } from '../signup/registration.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading = false;
    constructor(
        public router: Router,
        private loginService: RegistrationService,
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private cookieService: CookieService
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {}

    onLoggedin() {
        // this.loader.setLoading(true);
        this.isLoading = true;
        this.loginService.loginUser(this.loginForm.value).subscribe(
            response => {
                console.log(response);
                // this.loader.setLoading(false);
                this.isLoading = false;
                if (response.error) {
                    Swal.fire('Error', response.errMessage, 'error');
                    this.loginForm.reset();
                    return;
                }
                // localStorage.setItem('isLoggedin', response.entity.logged);
                // localStorage.setItem('loggedInDate', new Date().toDateString());
                // localStorage.setItem(
                  //  'username',
                    // response.entity.loggedInUser.fullName
                // );
                this.cookieService.set('isLoggedin', response.entity.logged);
                this.cookieService.set('loggedInDate', new Date().toDateString());
                this.cookieService.set('username', response.entity.loggedInUser.fullName);
                this.router.navigate(['/dashboard']);
            },
            err => {
                // this.loader.setLoading(false);
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
}
