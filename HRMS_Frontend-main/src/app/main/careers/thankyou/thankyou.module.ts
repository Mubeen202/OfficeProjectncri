import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankyouComponent } from './thankyou.component';
import { RouterModule, Routes } from '@angular/router';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [
  {
    path: 'thankyou',
    component: ThankyouComponent,
    // canActivate: [AuthGuard],
    // resolve: {
    //   faqData: FAQService
    // },
    data: { animation: 'job' }
  }
];

@NgModule({
  declarations: [
    ThankyouComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
    
  ]
})
export class ThankyouModule { }
