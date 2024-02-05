import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentListComponent } from './department-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


import { CoreSidebarModule } from '@core/components';
import { UserListService } from '../user-list.service';
import { RouterModule, Routes } from '@angular/router';
import { NewDepartmentSidebarComponent } from 'app/main/components/new-department-sidebar/new-department-sidebar.component';


const routes: Routes = [
  {
    path: 'setup/department-list',
    component: DepartmentListComponent,
    resolve: {
      uls: UserListService
    },
    data: { animation: 'datatables' }
  }
];

@NgModule({
  declarations: [
    DepartmentListComponent
  ],
   imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    CoreSidebarModule
  ],
  providers: [UserListService]
})
export class TenantListModule { }
