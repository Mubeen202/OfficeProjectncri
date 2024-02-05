import { Component, Input, OnInit,ViewEncapsulation } from '@angular/core';

import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobDescriptionComponent implements OnInit {
  public jobItem:any = {}
  public isEmpty; 
  
/**
   * Constructor
   *
   * 
   */
  @Input() item;
  constructor() { 

  }

  ngOnInit(): void {
    // console.log('this is data', this.item) 
   
  }




}
