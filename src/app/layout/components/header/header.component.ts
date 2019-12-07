import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    public pushRightClass: string;

    languages: { lang: string; code: string }[];
    username: string;
    subject: Subject<string> = new Subject();

    constructor(private translate: TranslateService, public router: Router) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        this.languages = [
            { lang: 'English', code: 'en' },
            { lang: 'French', code: 'fr' },
            { lang: 'Urdu', code: 'ur' },
            { lang: 'Spanish', code: 'es' },
            { lang: 'Italian', code: 'it' },
            { lang: 'Farsi', code: 'fa' },
            { lang: 'German', code: 'de' },
            { lang: 'Simplified Chinese', code: 'zh-CHS' },
            { lang: 'Marathi', code: 'mr' }
        ];
        this.username = localStorage.getItem('username');
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    ngAfterViewInit(): void {
        this.subject
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(value => this.onSearch(value));
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('username');
    }

    changeLang(language: string) {
        sessionStorage.setItem('selectedLang', language);
        this.translate.use(language);
    }
    onSearch(value: string) {
        if (value) {
            console.log(value);
        }
    }
}
