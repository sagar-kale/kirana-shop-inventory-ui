import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public loading$: Observable<boolean> = this.loading.asObservable();

    constructor() {}

    setLoading(val: boolean) {
        this.loading.next(val);
    }
}
