import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { Profile } from './profile.component';
import { ProfileService } from './profile.service';
import { CandidatePoolService } from '../candidate-pool/candidate-pool.service';

const routes: Routes = [
  {
    path: 'profile',
    component: Profile,
    canActivate: [AuthGuard],
    resolve: {
      profile: CandidatePoolService
    }
  }
];

@NgModule({
  declarations: [Profile],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule],

  providers: [CandidatePoolService]
})
export class ProfileModule {}
