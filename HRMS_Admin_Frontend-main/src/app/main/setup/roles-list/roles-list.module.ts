import { RolesListComponent } from './roles-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CoreSidebarModule } from '@core/components';
import { UserListService } from '../user-list.service';
import { RoleService } from '../roles-edit/role-edit.service';
import { NewRolesSidebarComponent } from 'app/main/components/new-roles-sidebar/new-roles-sidebar.component';


@NgModule({
  declarations: [
    RolesListComponent,NewRolesSidebarComponent
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
  providers: [RoleService]
})
export class RolesListModule { }

