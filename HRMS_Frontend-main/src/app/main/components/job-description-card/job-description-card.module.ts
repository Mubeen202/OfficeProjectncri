import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JobDescriptionCardComponent } from './job-description-card.component';



@NgModule({
  declarations: [JobDescriptionCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    JobDescriptionCardComponent
  ]
})
export class JobDescriptionCardModule { }
