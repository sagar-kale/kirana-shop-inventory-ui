import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoaderModule } from '../loader/loader.module';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SignupRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        SweetAlert2Module,
        LoaderModule
    ],
    declarations: [SignupComponent]
})
export class SignupModule {}
