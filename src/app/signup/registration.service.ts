import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private global_url: string;
    private USERS = '/users';

    constructor(private http: HttpClient) {
        this.global_url = environment.apiUrl;
    }

    registerUser(body: User): Observable<Response> {
        console.log(` in service ::: ${body}`);
        return this.http.post<Response>(
            this.global_url + this.USERS + '/add',
            body
        );
    }
    loginUser(body: User): Observable<Response> {
        return this.http.post<Response>(
            this.global_url + this.USERS + '/login',
            body
        );
    }
}
