import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewQuestionComponent } from './add-new-question.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserlistService } from '../joblisting/userlist.service';


const routes: Routes = [
  {
    path:  'careers/add-new-question',
    
    component: AddNewQuestionComponent,
    data: { animation: 'job' },
   

  },
  {
    path: 'careers/add-new-question/:id',
    component: AddNewQuestionComponent,
    resolve: {
      faqData: UserlistService
    },
    data: { animation: 'job' },
   

  }
];



@NgModule({
  declarations: [
    AddNewQuestionComponent
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
export class AddNewQuestionModule { }
