import { CompanyListComponent } from './company-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


import { CoreSidebarModule } from '@core/components';
import { UserListService } from '../user-list.service';


const routes: Routes = [
  {
    path: 'setup/company-list',
    component: CompanyListComponent,
    resolve: {
      uls: UserListService
    },
    data: { animation: 'datatables' }
  }
];

@NgModule({
  declarations: [
    CompanyListComponent
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
    CoreSidebarModule,
  ],
  providers: [UserListService]
})
export class CompanyListModule { }