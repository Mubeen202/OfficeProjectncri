import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverLetterComponent } from './cover-letter.component';
import { CoreDirectivesModule } from '@core/directives/directives';
import { FileUploadModule } from 'ng2-file-upload';




@NgModule({
  declarations: [
    CoverLetterComponent
  ],
  imports: [
    CommonModule,
    CoreDirectivesModule,
    FileUploadModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CoverLetterComponent]
})
export class CoverLetterModule { }
