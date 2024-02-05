import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CustomUploaderComponent } from './custom-uploader.component';



@NgModule({
  declarations: [
    CustomUploaderComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    NgbModule,
    ContentHeaderModule,
    CardSnippetModule,
    FileUploadModule,
    CoreCommonModule
  ],
  exports : [
    CustomUploaderComponent
  ]
})
export class CustomUploaderModule { }
