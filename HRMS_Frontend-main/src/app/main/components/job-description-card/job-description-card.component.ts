import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { CareersService } from 'app/main/careers/careers.service';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-job-description-card',
  templateUrl: './job-description-card.component.html',
  styleUrls: ['./job-description-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobDescriptionCardComponent implements OnInit {
  public jobItem:any = {}
  public isEmpty; 
  
/**
   * Constructor
   *
   * @param {CareersService} careerService 
   */
  constructor(private careerService: CareersService) { 

  }

  ngOnInit(): void {
    this.refreshCareerList();
    

  
  }



  refreshCareerList() {
    this.careerService.getJobById(localStorage.getItem('jobId')).then((data: any) => {
      this.jobItem = data.result.items
      console.log(this.jobItem)
       console.log(this.isEmpty = Object.keys(this.jobItem).length) ;
    }).catch(err => {
      console.log(err)
    })
   
 

  }


}
