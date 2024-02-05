import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ToastrComponent } from './toastr.component';
import { CustomToastrComponent } from './custom-toastr/custom-toastr.component';
// routing
const routes: Routes = [
  {
    path: 'toastr',
    component: ToastrComponent,
    data: { animation: 'toastr' }
  }
];

@NgModule({
    
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        NgbModule,
        ContentHeaderModule,
        CardSnippetModule,
        ToastrModule
    ],
    declarations: [ToastrComponent, CustomToastrComponent],
})
export class ToastrsModule {}
