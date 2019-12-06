import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;

    languages: { lang: string; code: string }[];

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
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
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
    }

    changeLang(language: string) {
        sessionStorage.setItem('selectedLang', language);
        this.translate.use(language);
    }
}
