import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCandidatesComponent } from './view-candidates.component';
import { CandidatePoolComponent } from './candidate-pool/candidate-pool.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CandidatePoolService } from './candidate-pool/candidate-pool.service';
import { StatsCardModule } from '../components/stats-card/stats-card.module';
import { Profile } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { AuthGuard } from 'app/auth/helpers';

import { CandidateDetailsModule } from '../components/candidate-details/candidate-details.module';
import { CoverLetterModule } from '../components/cover-letter/cover-letter.module';
import { BackgroundCheckModule } from '../components/background-check/background-check.module';
import { IdentityCheckModule } from '../components/identity-check/identity-check.module';
import { IdentityCheckService } from '../components/identity-check/identity-check.service';
import { EvaluationModule } from './candidate-evaluation/evaluation.module';
import { EvaluationService } from './candidate-evaluation/evaluation.service';
import { TimelineModule } from '../components/timeline/timeline.module';
import { EmailModule} from '../apps/email/email.module';
import { InterviewTableModule } from '../components/interview-table/interview-table.module';
import { InterviewTableService } from '../components/interview-table/interview-table.service';
import { EvaluationInfoTableModule } from '../components/evaluation-info-table/evaluation-info-table.module';
import { EvaluationInfoServiceService } from '../components/evaluation-info-table/evaluation-info-service.service';
import { EmailService as notesServices } from '../apps/email/email.service';
import { CalendarModule } from '../apps/calendar/calendar.module';
import { CalendarService } from '../apps/calendar/calendar.service';
import { EmailService } from '../components/email/email.service';
import { EmailNewModule } from '../components/email/emailNew.module';
import { Evaluation } from './candidate-evaluation/evaluation.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: 'view-candidates/candidate-pool',
    component: CandidatePoolComponent,
    resolve: {
      datatables: CandidatePoolService,
    },
    data: { animation: 'datatables' },
  },

  {
    path: 'view-candidates/candidate-evaluation/:id',
    component: Evaluation,
    resolve: {
      datatables: EvaluationService,
    },
    data: { animation: 'evaluation' },
  },
  {
    path: 'view-candidates/profile/:id',
    component: Profile,
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfileService,
    },
  },
];

@NgModule({
  declarations: [
    ViewCandidatesComponent,
    CandidatePoolComponent,
    Profile
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    NgbModule,
    CsvModule,
    CoreCommonModule,
    CardSnippetModule,
    ContentHeaderModule,
    StatsCardModule,
    CandidateDetailsModule,
    CoverLetterModule,
    BackgroundCheckModule,
    IdentityCheckModule,
    TimelineModule,
    InterviewTableModule,
    EvaluationInfoTableModule,
    EmailModule,
    
    EvaluationModule,
    CalendarModule,
    EmailNewModule
  ],
  providers: [
    CandidatePoolService,
    ProfileService,
    IdentityCheckService,
    InterviewTableService,
    EvaluationInfoServiceService,
    EmailService,
    CalendarService,
    notesServices,
    
    EvaluationService
  ],
})
export class ViewCandidatesModule {}
