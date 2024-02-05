import { Component, Input, OnInit } from '@angular/core';

import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';


import { I18n, CustomDatepickerI18n } from './date-picker-i18n.service';
@Component({
  selector: 'date-picker-i18n',
  templateUrl: './date-picker-i18n.component.html',
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }] // define custom NgbDatepickerI18n provider
})
export class DatePickerI18nComponent implements OnInit {
  public i18nDPdata: NgbDateStruct;


  // Input Decorator
  @Input() date;

  constructor() {}

  ngOnInit() {
    console.log("🚀 ~ file: date-picker-i18n.component.ts:18 ~ DatePickerI18nComponent ~ date:", this.date)


    
  }
}
