import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { NewUserSidebarComponent } from 'app/main/components/new-user-sidebar/new-user-sidebar.component';
import { CoreSidebarModule } from '@core/components';
import { UserListService } from './user-list.service';




import { FormsModule } from '@angular/forms';


import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreDirectivesModule } from '@core/directives/directives';

import { TenantEditComponent } from './tenant-edit/tenant-edit.component';
import { TenantEditService } from './tenant-edit/tenant-edit.service';


import { CompanyListComponent } from './company-list/company-list.component';


import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';

import { CorePipesModule } from '@core/pipes/pipes.module';
import { TenantService } from './tenant.services';
import { NewCompanySidebarComponent } from '../components/new-company-sidebar/new-company-sidebar.component';

import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyEditService } from './company-edit/company-edit.service';
import { CompanyEditModule } from './company-edit/company-edit.module';

import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { NewDepartmentSidebarComponent } from '../components/new-department-sidebar/new-department-sidebar.component';
import { DepartmentEditService } from './department-edit/department-edit.service';

import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';
import { NewRolesSidebarComponent } from '../components/new-roles-sidebar/new-roles-sidebar.component';

import { UserManagementComponent } from './user-management/user-management.component';
import { UserManagementSidebarComponent } from '../components/user-management-sidebar/user-management-sidebar.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RoleService } from './roles-edit/role-edit.service';
import { UserEditService } from './user-edit/user-edit.service';

const routes: Routes = [
  {
    path: 'setup/company-list',
    component: CompanyListComponent,
    resolve: {
      uls: UserListService
    },
    data: { animation: 'datatables' }
  },
   {
    path: 'setup/tenant-list',
    component: TenantListComponent,
    resolve: {
      
      uls: UserListService
    },
    data: { animation: 'datatables' }
  },
   {
    path: 'setup/tenant-edit/:id',
    component: TenantEditComponent,
    resolve: {
      ues: TenantEditService
    },
    data: { animation: 'UserEditComponent' }
  },

   {
    path: 'setup/company-edit/:id',
    component: CompanyEditComponent,
    resolve: {
      ues: CompanyEditService
    },
    data: { animation: 'UserEditComponent' }
  },
  {
    path: 'setup/department-list',
    component: DepartmentListComponent,
    data: { animation: 'datatables' }
  },

  {
    path: 'setup/department-edit/:id',
    component: DepartmentEditComponent,
    resolve: {
      ues: DepartmentEditService
    },
    data: { animation: 'UserEditComponent' }
  },

    {
    path: 'setup/roles-list',
    component: RolesListComponent,
    data: { animation: 'datatables' }
  },

    {
    path: 'setup/roles-edit/:id',
    component: RolesEditComponent,
    resolve: {
      ues: RoleService
    },
    data: { animation: 'UserEditComponent' }
  },

    {
    path: 'user-management',
    component: UserManagementComponent,
    data: { animation: 'datatables' }
  },

    {
    path: 'setup/user-edit/:id',
    component: UserEditComponent,
    resolve: {
      ues: UserEditService
    },
    data: { animation: 'UserEditComponent' }
  },
];


@NgModule({
  declarations: [
    SetupComponent,
    TenantEditComponent,
    TenantListComponent,
    CompanyListComponent,
    NewUserSidebarComponent,
    NewCompanySidebarComponent,
    DepartmentListComponent,
    DepartmentEditComponent,
    NewDepartmentSidebarComponent,
    RolesListComponent,
    RolesEditComponent,
    NewRolesSidebarComponent,
    UserManagementComponent,
    UserManagementSidebarComponent,
    UserEditComponent

  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
   CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    CsvModule,
    CompanyEditModule
   
  ],
   providers: [UserListService, TenantEditService, TenantService,CompanyEditService,DepartmentEditService, RoleService]
})
export class SetupModule { }
