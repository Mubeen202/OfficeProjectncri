import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewQuestionComponentForJob } from './add-new-question.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserlistService } from '../joblisting/userlist.service';


const routes: Routes = [
  

  {
    path: 'careers/add-new-question/:id',
    component: AddNewQuestionComponentForJob,
    resolve: {
      faqData: UserlistService
    },
    data: { animation: 'job' },
   

  }
];



@NgModule({
  declarations: [
    AddNewQuestionComponentForJob
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    FormsModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    NgxDatatableModule
  ]
})
export class AddNewQuestionForJobModule { }
