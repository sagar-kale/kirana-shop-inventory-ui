import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRoutingModule } from './customer-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
    declarations: [CustomerComponent],
    imports: [
        CommonModule,
        NgbModule,
        CustomerRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        PageHeaderModule
    ]
})
export class CustomerModule {}
