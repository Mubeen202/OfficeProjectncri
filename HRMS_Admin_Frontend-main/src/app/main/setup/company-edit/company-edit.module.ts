import { CompanyEditComponent } from './company-edit.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreDirectivesModule } from '@core/directives/directives';

import { CompanyEditService } from './company-edit.service';


const routes: Routes = [
  {
    path: 'setup/company-edit/:id',
    component: CompanyEditComponent,
    resolve: {
      ues: CompanyEditService
    },
    data: { animation: 'UserEditComponent' }
  },
];

@NgModule({
  declarations: [
    CompanyEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    Ng2FlatpickrModule,
    FormsModule,
    CoreDirectivesModule
  ]
})


export class CompanyEditModule { }
