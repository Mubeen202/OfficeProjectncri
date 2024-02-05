import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonComponent } from './coming-soon.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'pages/miscellaneous/coming-soon',
    component: ComingSoonComponent,
    
    data: { animation: 'datatables' }
  }
];

@NgModule({
  declarations: [
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ComingSoonModule { }
