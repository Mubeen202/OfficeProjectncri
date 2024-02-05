import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreDirectivesModule } from '@core/directives/directives';
import { SocialLinksCardComponent } from './social-links-card.component';



@NgModule({
  declarations: [SocialLinksCardComponent],
  imports: [
    CommonModule,
    CoreDirectivesModule
  ],
  exports :[
    SocialLinksCardComponent
  ]
})
export class SocialLinksCardModule { }
