import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast


import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { SelectModule } from './main/components/forms/form-elements/select/select.module';
import { FormWizardModule } from './main/components/forms/form-wizard/form-wizard.module';
import { CareersModule } from './main/careers/careers.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';

const appRoutes: Routes = [
 {
    path: 'careers',
    loadChildren: () => import('./main/careers/careers.module').then(m => m.CareersModule)
  },
{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'jobListing',
    loadChildren: () => import('./main/careers/careers.module').then(m => m.CareersModule)
  },
  {
    path: '**',
    redirectTo: '/careers/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SelectModule,
    FormWizardModule,
    CareersModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {
    scrollPositionRestoration: 'enabled'
}),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule
  ],
  // providers: [
  //   {
  //     provide:HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi:true,
  //   }
  // ],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
