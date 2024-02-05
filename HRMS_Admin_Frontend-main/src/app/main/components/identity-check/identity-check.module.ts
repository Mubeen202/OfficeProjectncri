import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityCheckComponent } from './identity-check.component';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IdentityCheckService } from './identity-check.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IdentityCheckComponent
  ],
  imports: [
    CommonModule,
    CoreDirectivesModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [IdentityCheckComponent],
providers:[IdentityCheckService]
})
export class IdentityCheckModule { }
