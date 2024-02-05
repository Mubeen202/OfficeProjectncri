import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CandidatePoolService } from 'app/main/view-candidates/candidate-pool/candidate-pool.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { DatePickerI18nModule } from '../date-picker-i18n/date-picker-i18n.module';

import { CandidateProfileComponent } from './candidate.profile.component';

const routes: Routes = [
  {
    path: 'careers/add-candidate',
    component: CandidateProfileComponent,
    resolve: {
      faqData: CandidatePoolService
    },
    data: { animation: 'wizard' }
  }
];

@NgModule({
  declarations: [CandidateProfileComponent],
  imports: [
    CommonModule,
    FileUploaderModule,
    DatePickerI18nModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    FormsModule,
    NgbModule,
    CoreDirectivesModule,
    NgSelectModule
  ]
})
export class CandidateProfileModule {}
