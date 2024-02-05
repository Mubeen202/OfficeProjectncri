import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EvaluationInfoServiceService } from './evaluation-info-service.service';
import { EvaluationInfoTableComponent } from './evaluation-info-table.component';

@NgModule({
  declarations: [EvaluationInfoTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CoreDirectivesModule,
    NgxDatatableModule,
  ],
  exports: [EvaluationInfoTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [EvaluationInfoServiceService]  
})
export class EvaluationInfoTableModule { }
