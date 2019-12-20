import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from 'src/app/shared';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';

@NgModule({
    declarations: [CustomerComponent],
    imports: [
        CommonModule,
        NgbModule,
        CustomerRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        PageHeaderModule,
    ]
})
export class CustomerModule {}
