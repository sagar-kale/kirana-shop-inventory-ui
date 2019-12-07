import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

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
}
