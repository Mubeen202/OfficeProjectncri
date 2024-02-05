import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import {  Evaluation } from './evaluation.component';
import { EvaluationService } from './evaluation.service';
import { CandidatePoolService } from '../candidate-pool/candidate-pool.service';
import { UserlistService } from 'app/main/careers/joblisting/userlist.service';

const routes: Routes = [
  {
    path: 'evaluation',
    component: Evaluation,
    canActivate: [AuthGuard],
    resolve: {
      evaluation: EvaluationService, UserlistService
    }
  }
];

@NgModule({
  declarations: [Evaluation],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule],

  providers: [EvaluationService, UserlistService]
})
export class EvaluationModule {}
