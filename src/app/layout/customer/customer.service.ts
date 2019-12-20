import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from './customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private globalUrl;
    private CUST = '/customers';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(private http: HttpClient) {
        this.globalUrl = environment.apiUrl;
    }

    getAllCustomers(page: number = 0, size: number = 1000): Observable<any> {
        return this.http.get<any>(
            this.globalUrl +
                this.CUST +
                `?page=${page}&size=${size}&sort=createdAt,desc`
        );
        // .pipe(
        //     map(res => {
        //         return res.content;
        //     })
        // );
    }
    saveCustomer(body: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.globalUrl + this.CUST, body);
    }
    isCustExists(id: number): Observable<boolean> {
        return this.http.get<boolean>(
            `${this.globalUrl}${this.CUST}/exists/${id}`
        );
    }
    removeCustomer(id: number): Observable<Response> {
        return this.http.delete<Response>(
            `${this.globalUrl}${this.CUST}/${id}`
        );
    }
    retriveCustomerById(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.globalUrl}${this.CUST}/${id}`);
    }

    updateCustomer(body: Customer): Observable<Response> {
        return this.http.put<Response>(
            this.globalUrl + this.CUST + '/' + body.id,
            body
        );
    }
}
