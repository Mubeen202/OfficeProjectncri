import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { RouterModule, Routes } from '@angular/router';

import { CoreSidebarModule } from '@core/components';
import { UserListService } from '../user-list.service';
import { UserManagementSidebarComponent } from 'app/main/components/user-management-sidebar/user-management-sidebar.component';
import { UserEditService } from '../user-edit/user-edit.service';


const routes: Routes = [
  {
    path: 'user-management',
    component: UserManagementComponent,
    resolve: {
      uls: UserEditService
    },
    data: { animation: 'datatables' }
  }
];

@NgModule({
  declarations: [
    UserManagementComponent,UserManagementSidebarComponent
  ],
   imports: [
    CommonModule,
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    CoreSidebarModule
  ],
  providers: [UserEditService]
})
export class UserManagementModule { }
