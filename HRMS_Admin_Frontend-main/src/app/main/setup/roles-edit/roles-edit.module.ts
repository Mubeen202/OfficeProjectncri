import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesEditComponent } from './roles-edit.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreDirectivesModule } from '@core/directives/directives';
import { RouterModule, Routes } from '@angular/router';
import { RoleService } from './role-edit.service';

const routes: Routes = [
  {
    path: 'setup/role-edit/:id',
    component: RolesEditComponent,
    resolve: {
      ues: RoleService
    },
    data: { animation: 'UserEditComponent' }
  },
];
@NgModule({
  declarations: [
    RolesEditComponent
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
export class RolesEditModule { }
