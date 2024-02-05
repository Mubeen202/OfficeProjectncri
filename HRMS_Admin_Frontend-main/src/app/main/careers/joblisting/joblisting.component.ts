import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserlistService } from './userlist.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JoblistingComponent implements OnInit {
  public data=[]
  public columns=[]

rows = [
    { postingTitle: 'Writer', username:'React Project', clientName: 'ABC Bank', recruiter: 'Martin', targetDate: '13-02-22', status: 'active', openings: '3' },
    { postingTitle: 'CSR', username:'React Project', clientName: 'Fido', recruiter: 'Jacob', targetDate: '22-02-23', status: 'pending', openings: '2' },
    { postingTitle: 'Project Manager', username:'React Project', clientName: 'Dubai Bank', recruiter: 'Dean', targetDate: '13-05-23', status: 'inactive', openings: '1' },
    { postingTitle: 'Call Agent', username:'React Project', clientName: 'ABC Bank', recruiter: 'Sam', targetDate: '04-12-22', status: 'active', openings: '2' },
    { postingTitle: 'Full Stack Developer', username:'React Project', clientName: 'Dealer', recruiter: 'Samantha', targetDate: '13-02-22', status: 'active', openings: '4' },
    { postingTitle: 'Team Lead', username:'React Project', clientName: 'Company', recruiter: 'Jessica', targetDate: '13-02-22', status: 'pending', openings: '1' },
    { postingTitle: 'HR Manager', username:'React Project', clientName: 'Swiss Bank', recruiter: 'Hayden', targetDate: '13-02-22', status: 'inactive', openings: '2' },
    { postingTitle: 'Financial Advisor', username:'React Project', clientName: 'ABC Bank', recruiter: 'Luther', targetDate: '13-02-22', status: 'inactive', openings: '1' },
    { postingTitle: 'QA Executive', username:'React Project', clientName: 'ABC Bank', recruiter: 'Mary', targetDate: '13-02-22', status: 'pending', openings: '3' },
    { postingTitle: 'Front End Developer', username:'React Project', clientName: 'ABC Bank', recruiter: 'Joel', targetDate: '13-02-22', status: 'active', openings: '2' },
    { postingTitle: 'Data Scientist', username:'React Project', clientName: 'ABC Bank', recruiter: 'Leslie', targetDate: '13-02-22', status: 'active', openings: '1' }
    
  ];
  
  // Public
  public sidebarToggleRef = false;
  
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public exportCSVData;
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';

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

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Active', value: 'Active' },
    { name: 'Inactive', value: 'Inactive' }
  ];

  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public searchValue = '';

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

    // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  currrentRow: any;

/**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {JoblistService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {Router} router
   * 
   */
  constructor(
    private _userListService: UserlistService,
    private _coreSidebarService: CoreSidebarService,
    private router: Router,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
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
    this.selectedStatus = this.selectStatus[0];

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


  getJobsList() {
    this._userListService.gettAllJobs().then((data: any) => {
      this.currrentRow = data.result
      this.data = data.result.items

      // this.data.filter(item=>{
      //   if(item.isActive==true){
      //     item.isActive='Inactive'
      //   }
      //   if(item.isActive==false){
      //     item.isActive='Active'
      //   }
      // })

      this.data.filter(item=>{
        if(item.draft==true ){
          item.draft='Inactive'
        }
        if(item.draft==false){
          item.draft='Active'
        }
        if(item.isActive==false){
          item.draft='Close'
        }
      })
      
      console.log('jjjjdkdjfk', this.data)

      this.columns = [];
    }).catch(err => {
      console.log(err)
    })
}

onChnageUrl(data){
  localStorage.setItem('jobId', JSON.stringify(data.id))
  if(data.draft =='Active'){
  this.router.navigateByUrl(`careers/job-publish/${data.id}`)

  }
  else if(data.draft== 'Inactive'){
  this.router.navigateByUrl(`careers/job-draft/${data.id}`)
  console.log("🚀 ~ file: joblisting.component.ts ~ line 154 ~ JoblistingComponent ~ onChnageUrl ~ url", data)

  }

}
  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousPlanFilter, this.previousStatusFilter);
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
    this.temp = this.filterRows(this.previousRoleFilter, filter, this.previousStatusFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By Status
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
    this.rows = this.temp;
  }

  /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param statusFilter
   */
  filterRows(roleFilter, planFilter, statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    roleFilter = roleFilter.toLowerCase();
    planFilter = planFilter.toLowerCase();
    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialNameMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      const isPartialGenderMatch = row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
      const isPartialStatusMatch = row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch && isPartialGenderMatch && isPartialStatusMatch;
    });
  }

 ngOnInit(): void {
  this.getJobsList()
    // // Subscribe config change
    // this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
    //   //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
    //   if (config.layout.animation === 'zoomIn') {
    //     setTimeout(() => {
    //       this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //         this.rows = response;
    //         this.tempData = this.rows;
    //         this.exportCSVData = this.rows;
    //       });
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
