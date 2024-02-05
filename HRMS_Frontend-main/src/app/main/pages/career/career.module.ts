import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploaderModule } from 'app/main/components/file-uploader/file-uploader.module';
import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CareerComponent } from 'app/main/pages/career/career.component';
// import { CareerService } from 'app/main/pages/career/career.service';
import { CareersService } from 'app/main/careers/careers.service';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [
  {
    path: 'career',
    component: CareerComponent,
    // canActivate: [AuthGuard],
    // resolve: {
    //   faqData: FAQService
    // },
    data: { animation: 'car' }
  }
];

@NgModule({
  declarations: [CareerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule, FileUploaderModule],
  providers: [CareersService]
})
export class CarrierModule {}
