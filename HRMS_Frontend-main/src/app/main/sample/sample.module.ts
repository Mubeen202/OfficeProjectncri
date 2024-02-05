import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SampleComponent } from './sample.component';
import { HomeComponent } from './home.component';
import { jobSampleModule } from './jobSample.module';
import { jobSampleComponent } from './jobSample.component';
import { FormsModule } from '@angular/forms';

const routes = [
  {
    path: 'sample',
    component: SampleComponent,
    data: { animation: 'sample' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  },
  {
    path: 'jobSample',
    component: jobSampleComponent,
    data: { animation: 'home' }
  },

 
];

@NgModule({
  declarations: [SampleComponent, HomeComponent],
  imports: [RouterModule.forChild(routes),FormsModule, ContentHeaderModule, TranslateModule, CoreCommonModule,jobSampleModule],
  exports: [SampleComponent, HomeComponent]
})
export class SampleModule {}
