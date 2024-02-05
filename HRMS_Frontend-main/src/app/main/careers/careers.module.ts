import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareersComponent } from './careers.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ApplyModule } from './apply/apply.module';
import { ThankyouModule } from './thankyou/thankyou.module';
import { FormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { JobListingModule } from './job-listing/job-listing.module';

import { FileUploaderModule } from 'app/main/components/file-uploader/file-uploader.module';
import { AuthGuard } from 'app/auth/helpers';

import { CareersService } from './careers.service';




const routes: Routes = [
  {
    path: 'careers',
    component: CareersComponent,
    // canActivate: [AuthGuard],
    // resolve: {
    //   faqData: FAQService
    // },
    data: { animation: 'job' },
  },
];



@NgModule({
  declarations: [
    CareersComponent
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
   CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    MiscellaneousModule,
    ContentHeaderModule,
    ApplyModule,
    ThankyouModule,
    CommonModule, RouterModule.forChild(routes),
    NgbModule, 
    CoreCommonModule, 
    ContentHeaderModule, 
    FileUploaderModule,
    JobListingModule
  ],
  providers: [
    CareersService
  ]
})
export class CareersModule { }
