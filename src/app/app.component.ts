import { Component, OnInit, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isLoginValid = false;
    constructor( private cookie: CookieService) {}
    @HostListener('window:beforeunload', ['$event'])
    clearLocalStorage(event) {
        const logInDate = this.cookie.get('loggedInDate');
        console.log(logInDate);
        const ld = new Date(logInDate);
        const cd = new Date();
        this.isLoginValid =
            ld.getFullYear() === cd.getFullYear() &&
            ld.getMonth() === cd.getMonth() &&
            ld.getDate() === cd.getDate();
        if (!this.isLoginValid) {
            // localStorage.clear();
            this.cookie.deleteAll();
        }
        console.log(this.isLoginValid);
        event.returnValue = 'dddddd';
    }

    ngOnInit() {}
}
