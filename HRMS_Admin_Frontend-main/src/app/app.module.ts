import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from '@fake-db/fake-db.service';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { FormsModule } from '@angular/forms';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { CareersModule } from './main/careers/careers.module';
import { fakeBackendProvider } from './auth/helpers/fake-backend';
import { SetupModule } from './main/setup/setup.module';
import { DashboardModule } from './main/dashboard/dashboard.module';
import { MiscellaneousModule } from './main/pages/miscellaneous/miscellaneous.module';
// import { Interceptor } from './interceptor/interceptor';
// import { AuthGuard } from './shared/auth.guard';
import { AuthGuard } from './auth/helpers';
import { JwtInterceptor } from './auth/helpers';
import { AuthenticationService } from './auth/service';
import { PagesModule } from './main/pages/pages.module';
import { NewRolesSidebarComponent } from './main/components/new-roles-sidebar/new-roles-sidebar.component';
import { UserManagementSidebarComponent } from './main/components/user-management-sidebar/user-management-sidebar.component';

import { ViewCandidatesModule } from './main/view-candidates/view-candidates.module';
import { AppsModule } from './main/apps/apps.module';

const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'careers/joblisting',
    loadChildren: () => import('./main/careers/careers.module').then(m => m.CareersModule)
  },

   {
    path: 'careers/add-job-opening',
    loadChildren: () => import('./main/careers/careers.module').then(m => m.CareersModule)
  },

  {
     path: 'careers/add-candidate',
    loadChildren : () => import('./main/careers/careers.module').then(m=>m.CareersModule)
  },

   {
     path: 'careers/job-publish',
    loadChildren : () => import('./main/careers/careers.module').then(m=>m.CareersModule)
  },

  {
     path: 'careers/add-new-question',
    loadChildren : () => import('./main/careers/careers.module').then(m=>m.CareersModule)
  },

    {
     path: 'setup/tenant-list',
    loadChildren : () => import('./main/setup/setup.module').then(m=>m.SetupModule)
  },

     {
     path: 'setup/tenant-edit',
    loadChildren : () => import('./main/setup/setup.module').then(m=>m.SetupModule)
  },

  {
     path: 'setup/department-list',
    loadChildren : () => import('./main/setup/setup.module').then(m=>m.SetupModule)
  },


  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  },

    {
     path: 'pages/miscellaneous/coming-soon',
    loadChildren : () => import('./main/pages/miscellaneous/miscellaneous.module').then(m=>m.MiscellaneousModule)
  },

  {
     path: 'view-candidates/candidate-pool',
    loadChildren : () => import('./main/view-candidates/view-candidates.module').then(m=>m.ViewCandidatesModule)
  },

  {
     path: 'view-candidates/profile',
    loadChildren : () => import('./main/view-candidates/view-candidates.module').then(m=>m.ViewCandidatesModule)
  },


  
];

@NgModule({
  declarations: [AppComponent, ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
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
    FormsModule,

    // App modules
    LayoutModule,
    SampleModule,
    CareersModule,
    SetupModule,
    ToastrModule,
    DashboardModule,
    PagesModule,
    MiscellaneousModule,
    ViewCandidatesModule,
    AppsModule
  ],
 
  
  bootstrap: [AppComponent],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi:true
  },
],
})
export class AppModule {}
