import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailsCardComponent } from './job-details-card.component';



@NgModule({
  declarations: [JobDetailsCardComponent],
  imports: [
    CommonModule
  ],
  exports : [
    JobDetailsCardComponent
  ]
})
export class JobDetailsCardModule { }
