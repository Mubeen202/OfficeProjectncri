import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantListComponent } from './tenant-list.component';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { NewUserSidebarComponent } from 'app/main/components/new-user-sidebar/new-user-sidebar.component';
import { NewCompanySidebarComponent } from 'app/main/components/new-company-sidebar/new-company-sidebar.component';
import { CoreSidebarModule } from '@core/components';
import { UserListService } from '../user-list.service';


const routes: Routes = [
  {
    path: 'setup/tenant-list',
    component: TenantListComponent,
    resolve: {
      
      uls: UserListService
    },
    data: { animation: 'datatables' }
  }
];

@NgModule({
  declarations: [
    TenantListComponent,NewUserSidebarComponent,NewCompanySidebarComponent
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
