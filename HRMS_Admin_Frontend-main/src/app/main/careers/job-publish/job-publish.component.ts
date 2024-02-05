import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserlistService } from '../joblisting/userlist.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-publish',
  templateUrl: './job-publish.component.html',
  styleUrls: ['./job-publish.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobPublishComponent implements OnInit {



rows = [
    { name: 'Kitty Allanson', email:'wiwlirug@talgajup.co.uk', clientName: 'ABC Bank', source: 'Martin', appliedDate: '13-02-22', candidateStage: 'Hired', Rating:'3' },
    { name: 'James Huleston', email:'wiwlirug@talgajup.co.uk', clientName: 'Fido', source: 'Jacob', appliedDate: '22-02-23', candidateStage: 'Engaged', Rating:'2'},
    { name: 'Project Manager', email:'wiwlirug@talgajup.co.uk', clientName: 'Dubai Bank', source: 'Dean', appliedDate: '13-05-23', candidateStage: 'Not hired', Rating:'3'},
    { name: 'Call Agent', email:'wiwlirug@talgajup.co.uk', clientName: 'ABC Bank', source: 'Sam', appliedDate: '04-12-22', candidateStage: 'Hired', Rating:'3'},
    { name: 'Full Stack Developer', email:'wiwlirug@talgajup.co.uk', clientName: 'Dealer', source: 'Samantha', appliedDate: '13-02-22', candidateStage: 'Hired',Rating:'3'},
    { name: 'Team Lead', email:'wiwlirug@talgajup.co.uk', clientName: 'Company', source: 'Jessica', appliedDate: '13-02-22', candidateStage: 'Engaged',Rating:'3' },
    { name: 'HR Manager', email:'wiwlirug@talgajup.co.uk', clientName: 'Swiss Bank', source: 'Hayden', appliedDate: '13-02-22', candidateStage: 'Not hired',Rating:'1'},
    { name: 'Financial Advisor', email:'wiwlirug@talgajup.co.uk', clientName: 'ABC Bank', source: 'Luther', appliedDate: '13-02-22', candidateStage: 'Not hired',Rating:'2' },
    { name: 'QA Executive', email:'wiwlirug@talgajup.co.uk', clientName: 'ABC Bank', source: 'Mary', appliedDate: '13-02-22', candidateStage: 'Engaged',Rating:'1' },
    { name: 'Front End Developer', email:'wiwlirug@talgajup.co.uk', clientName: 'ABC Bank', source: 'Joel', appliedDate: '13-02-22', candidateStage: 'Hired',Rating:'2'},
    { name: 'Data Scientist', email:'wiwlirug@talgajup.co.uk', clientName: 'ABC Bank', source: 'Leslie', appliedDate: '13-02-22', candidateStage: 'Hired',Rating:'3'}
    
  ];
  
  // Public
  public sidebarToggleRef = false;
  
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public exportCSVData;
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previouscandidateStageFilter = '';

  public selectRole: any = [
    { name: 'All', value: '' },
    { name: 'Admin', value: 'Admin' },
    { name: 'Author', value: 'Author' },
    { name: 'Editor', value: 'Editor' },
    { name: 'Maintainer', value: 'Maintainer' },
    { name: 'Subscriber', value: 'Subscriber' }
  ];

   public selectPlan: any = [
    { name: 'All', value: '' },
    { name: 'Basic', value: 'Basic' },
    { name: 'Company', value: 'Company' },
    { name: 'Enterprise', value: 'Enterprise' },
    { name: 'Team', value: 'Team' }
  ];

  public selectcandidateStage: any = [
    { name: 'All', value: '' },
    { name: 'Engaged', value: 'Engaged' },
    { name: 'Hired', value: 'Hired' },
    { name: 'InHired', value: 'InHired' }
  ];

  public selectedRole = [];
  public selectedPlan = [];
  public selectedcandidateStage = [];
  public searchValue = '';

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

    // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public currrentRow: any={};
  public statsJobs: any={};
  public data: any=[]
  ratingArray: any;

/**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {UserlistService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {Router} router
   */
  constructor(
    private _userListService: UserlistService,
    private _coreSidebarService: CoreSidebarService,
    private router: Router,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }
  candidateEvaluation(event){
  let id = JSON.parse(localStorage.getItem('jobId'))
  localStorage.setItem('factorJobId', JSON.stringify(id))
  localStorage.setItem('candidateRelatedJob', JSON.stringify(event))
  this.router.navigateByUrl(`/view-candidates/candidate-evaluation/${event}`)
  }

   // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedRole = this.selectRole[0];
    this.selectedPlan = this.selectPlan[0];
    this.selectedcandidateStage = this.selectcandidateStage[0];

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousPlanFilter, this.previouscandidateStageFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By Plan
   *
   * @param event
   */
  filterByPlan(event) {
    const filter = event ? event.value : '';
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, filter, this.previouscandidateStageFilter);
    this.rows = this.temp;
  }



  /**
   * Filter By candidateStage
   *
   * @param event
   */
  filterBycandidateStage(event) {
    const filter = event ? event.value : '';
    this.previouscandidateStageFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
    this.rows = this.temp;
  }
  getJobsList() {
    this._userListService.gettAllJobs().then((data: any) => {
      this.statsJobs = data.result
 
    }).catch(err => {
      console.log(err)
    })
}

  /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param candidateStageFilter
   */
  filterRows(roleFilter, planFilter, candidateStageFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    roleFilter = roleFilter.toLowerCase();
    planFilter = planFilter.toLowerCase();
    candidateStageFilter = candidateStageFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialNameMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      const isPartialGenderMatch = row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
      const isPartialcandidateStageMatch = row.candidateStage.toLowerCase().indexOf(candidateStageFilter) !== -1 || !candidateStageFilter;
      return isPartialNameMatch && isPartialGenderMatch && isPartialcandidateStageMatch;
    });
  }

  onAddCandidte(data){
    localStorage.setItem('jobId', JSON.stringify(data.id))
    this.router.navigateByUrl(`careers/add-candidate/${data.id}`)
  }

  onChnageUrl(data){
    localStorage.setItem('candidateId', JSON.stringify(data.canidateId.id))
    this.router.navigateByUrl(`view-candidates/profile/${data.canidateId.id}`)
  }
 ngOnInit(): void {
    // // Subscribe config change
    // this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
    //   //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
    //   if (config.layout.animation === 'zoomIn') {
    //     setTimeout(() => {
      this.getJobsList()
      this._userListService.onCreatorJob.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.currrentRow = response.result.items  
      this.data = this.currrentRow.candidateApplyToThisJob
      this.ratingArray= this.data.map((item)=>(
        item.candidateRealtedFactors.filter(item=>{return item.overAllScore})
      ))  
      console.log("🚀 ~ file: job-publish.component.ts:233 ~ JobPublishComponent ~ this._userListService.onCreatorJob.pipe ~ this.data:", this.ratingArray)
  
      // console.log("🚀 ~ file: job-publish.component.ts:201 ~ JobPublishComponent ~ this._userListService.onCreatorJob.pipe ~ this.currrentRow ", this.currrentRow )
      });
    //     }, 450);
    //   } else {
    //     this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //       this.rows = response;
    //       this.tempData = this.rows;
    //       this.exportCSVData = this.rows;
         
    //     });
    //   }
    // });
  }

    /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


}
