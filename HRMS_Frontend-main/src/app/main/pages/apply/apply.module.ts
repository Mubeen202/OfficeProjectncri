import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { ApplyComponent } from './apply.component';
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
import { FormWizardModule } from 'app/main/components/forms/form-wizard/form-wizard.module';

const routes: Routes = [
  {
    path: 'apply',
    component: ApplyComponent,
    // canActivate: [AuthGuard],
    // resolve: {
    //   faqData: FAQService
    // },
    data: { animation: 'job' }
  }
];

@NgModule({
  declarations: [ApplyComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    NgbModule,
    CoreCommonModule, 
    ContentHeaderModule,
    NavbarModule,
    SignUpCardModule,
    JobDetailsCardModule,
    SocialLinksCardModule,
    JobDescriptionCardModule,
    ApplyformModule,
    QuestionsCardModule,
    FormWizardModule
  ],

  
})
export class ApplyModule { }
