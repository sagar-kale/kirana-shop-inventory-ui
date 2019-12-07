import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        ProductRoutingModule,
        TranslateModule
    ],
    declarations: [ProductComponent]
})
export class ProductModule {}
