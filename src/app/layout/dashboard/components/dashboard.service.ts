import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private globalUrl: string;
    constructor(private http: HttpClient) {
        this.globalUrl = environment.apiUrl;
    }
    getMisc(): Observable<any> {
        return this.http.get<any>(`${this.globalUrl}/misc`);
    }
}
