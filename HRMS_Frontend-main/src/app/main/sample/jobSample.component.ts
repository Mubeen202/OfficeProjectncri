import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { CoreConfigService } from '@core/services/config.service';
import { CareersService } from '../careers/careers.service';
@Component({
  selector: 'app-jobSample',
  templateUrl: './jobSample.component.html',
  styleUrls: ['./jobSample.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class jobSampleComponent implements OnInit {
  public data:any= [];
  public filterUser:any= [];
  public page = 1;
  public careerJobId: string;
  public title: string;
  public pageSize = 10;
  constructor(private _coreConfigService: CoreConfigService, private jobSampleService: CareersService) {

     // Configure the layout
     this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  public contentHeader: object

  refreshjobListingList() {
    this.jobSampleService.careerJobs().then((data: any) => {
      
        this.data = data.result.items
        console.log(this.data.length)
       
    }).catch(err => {
      console.log(err)
    })
  }
  filteredJobs() {
    this.jobSampleService.careerJobsSelection(this.title).then((data: any) => {
      
        this.data = data.result.items
    }).catch(err => {
      console.log(err)
    })
  }
  search(){
    if(this.title == ""){
      console.log('if part')
      this.ngOnInit()
    }
    else{
      this.data = this.filteredJobs()
    }
  }
  actionButton(event:any) {
    localStorage.setItem('jobId',event.id);
  }
  

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.refreshjobListingList()
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
  }
}

