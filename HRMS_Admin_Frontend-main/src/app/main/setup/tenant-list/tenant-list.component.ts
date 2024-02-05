import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { TenantService } from '../tenant.services';
import { UserListService } from '../user-list.service';
import { Routes, RouterModule, RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TenantListComponent implements OnInit {
  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  // public
  public sidebarToggleRef = false;
  public contentHeader: object;
   public selectedOption = 10;
    public searchValue = '';
  public rows: any;
  public selected = [];
  public name:string
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public data:any=[];
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;
  public columns=[]

 

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;



  // Public Methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {

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
   * Inline editing Name
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateName(event, cell, rowIndex) {
    this.editingName[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Age
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateAge(event, cell, rowIndex) {
    this.editingAge[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Salary
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateSalary(event, cell, rowIndex) {
    this.editingSalary[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Status
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateStatus(event, cell, rowIndex) {
    this.editingStatus[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }


 

  /**
   * For ref only, log selected values
   *
   * @param selected
   * 
   */
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  /**
   * For ref only, log activate events
   *
   * @param selected
   */
  onActivate(event) {
    // console.log('Activate Event', event);
  }

  /**
   * Custom Chkbox On Select
   *
   * @param { selected }
   */
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }

  /**
   * Constructor
   *
  
   * @param {CoreConfigService} _coreConfigService
   * @param {UserListService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {DatatablesService} _dataTablesService
   */
  constructor(
    private _userListService: UserListService,
    private _coreSidebarService: CoreSidebarService,
    private _dataTablesService: TenantService,
    private _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();
   
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

 /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }



 


  /**
   * On init
   */
  ngOnInit() {
    this.getTenantList()
    
   
     // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
      if (config.layout.animation === 'zoomIn') {
        setTimeout(() => {
          this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.rows = response;
            this.tempData = this.rows;
          });
        }, 450);
      } else {
        this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          this.rows = response;
          this.tempData = this.rows;
        });
      }
    });

    

    // content header
    this.contentHeader = {
      headerTitle: 'Datatables',
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
            name: 'Forms & Tables',
            isLink: true,
            link: '/'
          },
          {
            name: 'Datatables',
            isLink: false
          }
        ]
      }
    };
  }


  editTenantRecord(row:any){
    if(row && row.id)
   { 
    localStorage.setItem('tenantId', JSON.stringify(row.id))
  }
  }

  delete(row:string){
    if(row ){
      this._dataTablesService.deleteTenant(row).then((data:any)=>{
      alert('Tenant Information Deleted Successfully')
      window.location.reload()
      },
      error=>{
        console.log('jjjj', error.error.message)
        alert(error.error.message)
      })

    }

  }
  getTenantList() {
    this._dataTablesService.tenantList().then((data: any) => {
      // this.data = data.result.items
      this.data = data.result.items.map(item =>{
        let hour =  moment(item.updated_at).hours()
        let minutes =  moment(item.updated_at).minutes()
        let dateFormat2 = moment(item.updated_at).format('h:mm A , D/MMM/YYYY ')
        let date = moment(dateFormat2, 'h:mm A DD/MMM/YYYY ').format("h:mm A DD MMM YYYY ")

        // let date = this.timeConvert(item.updated_at)
        console.log("🚀 ~ file: career.component.ts ~ line 131 ~ CareerComponent ~ this.careerService.careerJobs ~ date", hour, minutes)
        item.updated_at = date 
        return item
      })
      this.data.filter(item=>{
        if(item.isActive==true){
          item.isActive='Active'
        }
        if(item.isActive==false){
          item.isActive='Inactive'
        }
      })
      this.columns = [{ prop: 'code' }, { name: 'name' }, { name: 'isActive' }];
    }).catch(err => {
      console.log(err)
    })
}

filteredTenant() {
  this._dataTablesService.searchTenantList(this.name).then((data: any) => {
    
    this.data = data.result.items
    this.data = data.result.items.map(item =>{
      let hour =  moment(item.updated_at).hours()
      let minutes =  moment(item.updated_at).minutes()
      let dateFormat2 = moment(item.updated_at).format('h:mm A , D/MM/YYYY ')
      let date = moment(dateFormat2, 'h:mm A DD/MM/YYYY ').format("h:mm A DD MMM YYYY ")

      // let date = this.timeConvert(item.updated_at)
      console.log("🚀 ~ file: career.component.ts ~ line 131 ~ CareerComponent ~ this.careerService.careerJobs ~ date", hour, minutes)
      item.updated_at = date 
      return item
    })
    this.data.filter(item=>{
      if(item.isActive==true){
        item.isActive='Active'
      }
      if(item.isActive==false){
        item.isActive='Inactive'
      }
    })
    this.columns = [{ prop: 'code' }, { name: 'name' }, { name: 'isActive' }];
  }).catch(err => {
    console.log(err)
  })
}

search(){
    if(this.name == ""){
      this.ngOnInit()
    }
    else{
      
      this.data = this.filteredTenant()
    }
  
  // setTimeout(searchByName , 5000)

 
}

}