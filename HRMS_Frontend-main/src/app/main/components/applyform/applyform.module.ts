import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploaderModule } from 'app/main/components/file-uploader/file-uploader.module';
import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ApplyFormService } from './applyform.service';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApplyformComponent } from './applyform.component';



@NgModule({
  declarations: [
    ApplyformComponent
  ],
  schemas : [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    NgbModule,
    FileUploaderModule,
    CoreCommonModule,
    ContentHeaderModule,
  ],
  exports:[
    ApplyformComponent
  ],
  providers : [
    ApplyFormService
  ]
})
export class ApplyformModule { }
