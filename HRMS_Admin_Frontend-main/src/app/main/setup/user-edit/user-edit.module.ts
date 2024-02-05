import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreDirectivesModule } from '@core/directives/directives';
import { UserEditService } from './user-edit.service';

const routes: Routes = [
  {
    path: 'user-management',
    component: UserEditComponent,
    resolve: {
      uls: UserEditService
    },
    data: { animation: 'datatables' }
  }
];

@NgModule({
  declarations: [
    UserEditComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    Ng2FlatpickrModule,
    FormsModule,
    CoreDirectivesModule
  ]
})
export class UserEditModule { }
