import { Component, OnInit } from '@angular/core';
import { CareersService } from 'app/main/careers/careers.service';
@Component({
  selector: 'app-job-details-card',
  templateUrl: './job-details-card.component.html',
  styleUrls: ['./job-details-card.component.scss']
})
export class JobDetailsCardComponent implements OnInit {
  public jobDetails:any = {}


  constructor(private careerService: CareersService) { }

 ngOnInit(): void {
    this.getJobDetails();
  }



  getJobDetails() {
    this.careerService.getJobById(localStorage.getItem('jobId')).then((data: any) => {
      this.jobDetails = data.result.items
    }).catch(err => {
      console.log(err)
    })

 

  }

}
