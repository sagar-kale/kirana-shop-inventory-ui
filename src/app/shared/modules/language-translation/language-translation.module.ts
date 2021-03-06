/**
 * This module is used to language translations.
 * The translations are saved in a json file in /src/app/assets/i18n directory
 * Docs: https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular7-app-with-ngx-translate
 */
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import ngx-translate and the http loader
import {
    TranslateLoader,
    TranslateModule,
    TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';

// ngx-translate - required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [],
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [TranslateModule]
})
export class LanguageTranslationModule {
    constructor(private translate: TranslateService, private cookieService: CookieService) {
        // Gets Default language from browser if available, otherwise set English ad default
        this.translate.addLangs([
            'en',
            'mr',
            'fr',
            'ur',
            'es',
            'it',
            'fa',
            'de',
            'zh-CHS'
        ]);
        const lang = this.cookieService.get('selectedLang'); // sessionStorage.getItem('selectedLang');

        if (lang && lang !== 'null' && lang !== 'undefined') {
            this.translate.setDefaultLang(lang);
            console.log(`selected lang code is ${lang}`);
        } else {
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(
                browserLang.match(/en|mr|fr|ur|es|it|fa|de|zh-CHS/)
                    ? browserLang
                    : lang || 'en'
            );
        }
    }
}
