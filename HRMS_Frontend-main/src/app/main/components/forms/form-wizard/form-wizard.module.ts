import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreDirectivesModule } from '@core/directives/directives';

import { FormWizardComponent } from './form-wizard.component';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SignUpCardComponent } from 'app/main/components/sign-up-card/sign-up-card.component';
import { SignUpCardModule } from 'app/main/components/sign-up-card/sign-up-card.module';
import { JobDetailsCardComponent } from 'app/main/components/job-details-card/job-details-card.component';
import { JobDetailsCardModule } from 'app/main/components/job-details-card/job-details-card.module';
import { SocialLinksCardComponent } from 'app/main/components/social-links-card/social-links-card.component';
import { SocialLinksCardModule } from 'app/main/components/social-links-card/social-links-card.module';
import { JobDescriptionCardComponent } from 'app/main/components/job-description-card/job-description-card.component';
import { JobDescriptionCardModule } from 'app/main/components/job-description-card/job-description-card.module';
import { ApplyformModule } from 'app/main/components/applyform/applyform.module';
import { QuestionsCardModule } from 'app/main/components/questions-card/questions-card.module';
import { CustomUploaderModule } from '../../custom-uploader/custom-uploader.module';



const routes: Routes = [
  {
    path: 'form-wizard',
    component: FormWizardComponent,
    data: { animation: 'wizard' }
  }
];

@NgModule({
  declarations: [FormWizardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    FormsModule,
    CoreDirectivesModule,
    NgSelectModule,
    SignUpCardModule,
    JobDetailsCardModule,
    SocialLinksCardModule,
    JobDescriptionCardModule,
    ApplyformModule,
    QuestionsCardModule,
    CustomUploaderModule
  ],
  exports: [
    FormWizardComponent
  ]
})
export class FormWizardModule {}
