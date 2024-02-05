import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddJobOpeningComponent } from './add-job-opening.component';
import { StatsCardModule } from 'app/main/components/stats-card/stats-card.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { CoreDirectivesModule } from '@core/directives/directives';
import { QuestionListService } from '../joblisting/question.service';

const routes: Routes = [
  {
    path: 'careers/add-job-opening',
    component: AddJobOpeningComponent,
    // canActivate: [AuthGuard],
    resolve: {
      faqData: QuestionListService
    },
    data: { animation: 'job' }
  }
];

@NgModule({
  declarations: [
    AddJobOpeningComponent
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
  ]
})
export class AddJobOpeningModule { }
