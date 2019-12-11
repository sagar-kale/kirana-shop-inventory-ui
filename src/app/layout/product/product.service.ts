import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/models/response';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private globalUrl;
    private PRODUCT = '/product';
    private CATEGORY = '/category';
    private MEASUREMENT = '/measurement';
    private MEASUREMENTS = '/measurements';

    constructor(private http: HttpClient) {
        this.globalUrl = environment.apiUrl;
    }

    getAllMeasurements(): Observable<any> {
        return this.http
            .get<any>(
                this.globalUrl +
                    this.PRODUCT +
                    this.MEASUREMENTS +
                    '?size=1000&sort=createdAt,desc'
            )
            .pipe(
                map(res => {
                    return res.content;
                })
            );
    }
    getAllCategories(): Observable<any> {
        return this.http.get<any>(this.globalUrl + this.CATEGORY);
    }
    getAllProduct(): Observable<any> {
        return this.http.get<any>(this.globalUrl + this.PRODUCT);
    }
    saveProduct(body: any): Observable<Response> {
        return this.http.post<Response>(this.globalUrl + this.PRODUCT, body);
    }
    isProductNameExists(name: string): Observable<boolean> {
        return this.http.get<boolean>(
            `${this.globalUrl}${this.PRODUCT}/exists?productName=${name}`
        );
    }
    removeProduct(id: number): Observable<Response> {
        return this.http.delete(`${this.globalUrl}${this.PRODUCT}/${id}`);
    }
    retriveProductById(id: number): Observable<any> {
        return this.http.get(`${this.globalUrl}${this.PRODUCT}/${id}`);
    }
}
