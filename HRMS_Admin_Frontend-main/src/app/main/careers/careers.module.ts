import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CareersComponent } from './careers.component';
import { JoblistingModule } from './joblisting/joblisting.module';
import { AddJobOpeningModule } from './add-job-opening/add-job-opening.module';
import { AddCandidateModule } from './add-candidate/add-candidate.module';
import { JobDraftModule } from './job-draft/job-draft.module';
import { JobPublishModule } from './job-publish/job-publish.module';
import { AddNewQuestionModule } from './add-new-question/add-new-question.module';
import { JobEditModule } from './job-edit/job-edit.module';
import { AddCandidateBySpecificIdModule } from './add-candidate-by-job-id/add-candidate.module';
import { AddNewQuestionForJobModule } from './add-new-question-by-job-id/add-new-question.module';
import { LinkCandidateToJobModule } from './candidate-link-to-job/link-candidate.module';
import { CandidateProfileModule } from './edit-candidate-profile/candidate.profile.module';
@NgModule({
  declarations: [
    CareersComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    JoblistingModule,
    AddJobOpeningModule,
    AddCandidateModule,
    // AddCandidateBySpecificIdModule,
    LinkCandidateToJobModule,
    AddNewQuestionForJobModule,
    JobDraftModule,
    JobEditModule,
    JobPublishModule,
    AddNewQuestionModule,
    CandidateProfileModule
  ],
})
export class CareersModule { }
