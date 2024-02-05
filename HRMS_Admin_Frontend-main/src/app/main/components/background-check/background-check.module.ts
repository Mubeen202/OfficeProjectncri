import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundCheckComponent } from './background-check.component';
import { CoreDirectivesModule } from '@core/directives/directives';



@NgModule({
  declarations: [
    BackgroundCheckComponent
  ],
  imports: [
    CommonModule,
    CoreDirectivesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [BackgroundCheckComponent]
})
export class BackgroundCheckModule { }
