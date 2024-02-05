import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCandidateComponentBySpecificJob } from './add-candidate.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { FileUploadModule } from 'ng2-file-upload';
import { UserlistService } from '../joblisting/userlist.service';



const routes: Routes = [
  {
    path: 'careers/add-candidate',
    component: AddCandidateComponentBySpecificJob,
    // canActivate: [AuthGuard],
    resolve: {
      faqData: UserlistService
    },
    data: { animation: 'job' }
  }
];


@NgModule({
  declarations: [
    AddCandidateComponentBySpecificJob
  ],
    schemas : [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    CoreDirectivesModule
  ],
  exports: [AddCandidateComponentBySpecificJob]
})
export class AddCandidateBySpecificIdModule { }
