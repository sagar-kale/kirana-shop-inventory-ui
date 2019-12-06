import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SignupRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule
    ],
    declarations: [SignupComponent]
})
export class SignupModule {}
