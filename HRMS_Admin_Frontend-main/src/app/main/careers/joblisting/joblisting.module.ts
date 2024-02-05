import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JoblistingComponent } from './joblisting.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserlistService } from './userlist.service';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CsvModule } from '@ctrl/ngx-csv';
import { StatsCardComponent } from 'app/main/components/stats-card/stats-card.component';
import { StatsCardModule } from 'app/main/components/stats-card/stats-card.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuestionListService } from './question.service';
const routes: Routes = [
  {
    path: 'careers/joblisting',
    component: JoblistingComponent,
    // canActivate: [AuthGuard],
    // resolve: {
    //   faqData: FAQService
    // },
    data: { animation: 'job' }
  }
];


@NgModule({
  declarations: [
    JoblistingComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
     RouterModule.forChild(routes), 
     FormsModule,
     CoreDirectivesModule,
     CsvModule,
     StatsCardModule,
     NgxDatatableModule
  ],
  providers:[UserlistService, QuestionListService]
})
export class JoblistingModule { }
