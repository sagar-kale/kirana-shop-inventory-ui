import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductComponent } from './product.component';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), TranslateModule],
    exports: [RouterModule]
})
export class ProductRoutingModule {}
