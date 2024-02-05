import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CarrierModule } from 'app/main/pages/career/career.module';
import { ApplyModule } from './apply/apply.module';
import { ThankyouModule } from './thankyou/thankyou.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/interceptor/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    MiscellaneousModule,
    CarrierModule,
    ContentHeaderModule,
    ApplyModule,
    ThankyouModule
  ],

  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ]
})
export class PagesModule {}
