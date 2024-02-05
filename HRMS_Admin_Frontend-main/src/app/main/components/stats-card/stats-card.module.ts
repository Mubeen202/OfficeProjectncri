import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './stats-card.component';
import { CoreDirectivesModule } from '@core/directives/directives';



@NgModule({
  declarations: [
    StatsCardComponent
  ],
    schemas : [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    CoreDirectivesModule
  ],
  exports:[
    StatsCardComponent
  ]
})
export class StatsCardModule { }
