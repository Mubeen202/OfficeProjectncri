import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateDetailsComponent } from './candidate-details.component';



@NgModule({
  declarations: [
    CandidateDetailsComponent
  ],
   schemas : [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CandidateDetailsComponent
  ]
})
export class CandidateDetailsModule { }
