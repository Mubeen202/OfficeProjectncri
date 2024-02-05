import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantEditComponent } from './tenant-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreDirectivesModule } from '@core/directives/directives';


import { TenantEditService } from './tenant-edit.service';


const routes: Routes = [
  {
    path: 'setup/tenant-edit/:id',
    component: TenantEditComponent,
    resolve: {
      ues: TenantEditService
    },
    data: { animation: 'UserEditComponent' }
  },
];

@NgModule({
  declarations: [
    TenantEditComponent
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
export class TenantEditModule { }


