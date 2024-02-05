import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { InterviewTableService } from './interview-table.service';
import { InterviewTableComponent } from './interview-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [InterviewTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CoreDirectivesModule,
    NgxDatatableModule,
  ],
  exports: [InterviewTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [InterviewTableService]  
})
export class InterviewTableModule { }
