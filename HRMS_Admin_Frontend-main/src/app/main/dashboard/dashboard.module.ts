import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';

import { CoreCommonModule } from '@core/common.module';



import { DashboardService } from 'app/main/dashboard/dashboard.service';

import { DashboardComponent } from './dashboard.component';

const routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { roles: [Role.User,Role.Client], animation: 'danalytics' },
    resolve: {
      css: DashboardService,
    }
  }
  
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
   
  ],
  providers: [DashboardService,],
  exports: [DashboardComponent]
})
export class DashboardModule {}
