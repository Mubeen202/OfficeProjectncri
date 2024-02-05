import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobEditComponent } from './job-edit.component';
import { StatsCardModule } from 'app/main/components/stats-card/stats-card.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { CoreDirectivesModule } from '@core/directives/directives';
import { UserlistService } from '../joblisting/userlist.service';

const routes: Routes = [
  {
    path: 'careers/job-edit/:id',
    component: JobEditComponent,
    // canActivate: [AuthGuard],
    resolve: {
      faqData: UserlistService
    },
    data: { animation: 'job' }
  }
];

@NgModule({
  declarations: [
    JobEditComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    StatsCardModule,
    RouterModule.forChild(routes), 
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    CoreDirectivesModule
  ],
  exports: [
    JobEditComponent
  ]
})
export class JobEditModule { }
