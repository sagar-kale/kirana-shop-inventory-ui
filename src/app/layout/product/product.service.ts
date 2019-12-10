import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private globalUrl = 'http://localhost:8080/api';
    private PRODUCT = '/product';
    private CATEGORY = '/category';
    private MEASUREMENT = '/measurement';
    private MEASUREMENTS = '/measurements';

    constructor(private http: HttpClient) {}

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
}
