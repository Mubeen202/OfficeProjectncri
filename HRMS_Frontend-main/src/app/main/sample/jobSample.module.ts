import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from '../components/forms/form-elements/select/select.module';
import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { SelectComponent } from '../components/forms/form-elements/select/select.component';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { jobSampleComponent } from './jobSample.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CareersService } from '../careers/careers.service';
const routes: Routes = [
  {
    path: 'jobSample',
    component: jobSampleComponent,
    // canActivate: [AuthGuard],
    // resolve: {
    //   faqData: FAQService
    // },
    data: { animation: 'car' }
  }
];

@NgModule({
  declarations: [jobSampleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule,
     RouterModule.forChild(routes),
      FormsModule,
      NgbModule,
      CoreCommonModule,
      ContentHeaderModule,
      NavbarModule, 
      SelectModule
    ],

  providers: [CareersService]
})
export class jobSampleModule { }
