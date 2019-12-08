import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private global_url = 'http://localhost:8080/api/users/';

    constructor(private http: HttpClient) {}


    registerUser(body: User): Observable<Response> {
        console.log(` in service ::: ${body}`);
        return this.http.post<Response>(this.global_url + 'add', body);
    }
    loginUser(body: User): Observable<Response> {
        return this.http.post<Response>(this.global_url + 'login', body);
    }

    buildAlert(title: string, msg: string, level: SweetAlertIcon) {
        Swal.fire(title, msg, level);
    }
    buildHtmlAlert(title: string, msg: any, level: SweetAlertIcon) {
        Swal.fire({
            title: title,
            icon: level,
            html: JSON.stringify(msg)
        });
    }
}
