import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsCardComponent } from './questions-card.component';



@NgModule({
  declarations: [QuestionsCardComponent],
  imports: [
    CommonModule
  ],
  exports : [
    QuestionsCardComponent ]
})
export class QuestionsCardModule { }
