import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPublishComponent } from './job-publish.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreDirectivesModule } from '@core/directives/directives';
import { StatsCardModule } from 'app/main/components/stats-card/stats-card.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JobDescriptionModule } from 'app/main/components/job-description/job-description.module';
import { UserlistService } from '../joblisting/userlist.service';



const routes: Routes = [
  {
    path: 'careers/job-publish/:id',
    component: JobPublishComponent,
    // canActivate: [AuthGuard],
    resolve: {
      faqData: UserlistService
    },
    data: { animation: 'job' }
  }
];

@NgModule({
  declarations: [
    JobPublishComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    CoreDirectivesModule,
    StatsCardModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgSelectModule,
    NgbModule,
    JobDescriptionModule
  ]
})
export class JobPublishModule { }
