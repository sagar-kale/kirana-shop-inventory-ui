import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { AbstractControl } from '@angular/forms';
import { Response } from 'src/app/models/response';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        null
    );
    public loading$: Observable<boolean> = this.loading.asObservable();

    constructor() {}

    setLoading(val: boolean) {
        this.loading.next(val);
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
    checkValidEmail(control: AbstractControl) {
        const emailPat = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
        return new Promise((res, rej) => {
            if (emailPat.test(control.value)) {
                res(null); // return null means validation pass
            } else {
                res({ vaild: false }); // failed with message
            }
        });
    }
    displayError(msg: string) {
        this.buildAlert('Error', msg, 'error');
    }
    displaySuccessMsg(msg: string) {
        this.buildAlert('Success', msg, 'success');
    }
}
