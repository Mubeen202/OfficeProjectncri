import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateEducation } from './timeline.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { TimelineComponent } from 'app/main/components/timeline/timeline.component';

const routes: Routes = [
  {
    path: 'timeline',
    component: TimelineComponent,
    resolve: {
      email: CandidateEducation
    },
    data: { animation: 'timeline' }
  }
];

@NgModule({
  declarations: [TimelineComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    ContentHeaderModule,
    CoreCommonModule,
    CardSnippetModule
  ],
  providers: [CandidateEducation],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [TimelineComponent]
})
export class TimelineModule {}
