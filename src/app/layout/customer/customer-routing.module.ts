import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), TranslateModule],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}
