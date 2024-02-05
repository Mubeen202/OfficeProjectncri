import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDescriptionComponent } from './job-description.component';



@NgModule({
  declarations: [
    JobDescriptionComponent
  ],
    schemas : [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule
  ],
  exports: [JobDescriptionComponent]
})
export class JobDescriptionModule { }
