import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListingComponent } from './job-listing.component';
import { RouterModule, Routes } from '@angular/router';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'app/main/components/forms/form-elements/select/select.module';
import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { SelectComponent } from 'app/main/components/forms/form-elements/select/select.component';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { CareersService } from '../careers.service';

const routes: Routes = [
  {
    path: 'joblisting',
    component: JobListingComponent,
    // canActivate: [AuthGuard],
    // resolve: {
    //   faqData: FAQService
    // },
    data: { animation: 'job' }
  }
];


@NgModule({
  declarations: [JobListingComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
     RouterModule.forChild(routes),
      FormsModule,
      NgbModule,
      CoreCommonModule,
      ContentHeaderModule,
      NavbarModule, 
      SelectModule
  ]
})
export class JobListingModule { }
