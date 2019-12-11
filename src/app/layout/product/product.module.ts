import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        ProductRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ProductComponent]
})
export class ProductModule {}
