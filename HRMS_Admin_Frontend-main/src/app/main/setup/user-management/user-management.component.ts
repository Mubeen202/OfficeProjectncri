import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
// import { TenantService } from '../tenant.services';
import { UserListService } from '../user-list.service';
import { UserEditService } from '../user-edit/user-edit.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class UserManagementComponent implements OnInit {
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
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public data:any=[];
  public userRoles=[];
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;
  public columns=[]
  public username:string

 

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
    private _dataTablesService: UserEditService,
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
    this.getAllUsers()
    
   
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


  editRecord(row:any){
    if(row )
   { 
    localStorage.setItem('userId', JSON.stringify(row))
  }
  }

  // delete(row:string){
  //   if(row ){
  //     this._dataTablesService.deleteTenant(row).then((data:any)=>{
  //     alert('Tenant Information Deleted Successfully')
  //     },
  //     error=>{
  //       console.log('jjjj', error.error.message)
  //       alert(error.error.message)
  //     })

  //   }

  // }
  getAllUsers() {
    this._dataTablesService.gettAllUsers().then((data: any) => {
      //formattedVal is define for return user roles values and join it with the bases of coma
      this.data = data.result.items.map((r) => {
        let formattedVal = r.usersRoles.map((k) => k.roleId.name).join(',');
        return {
          ...r,
          usersRoles: formattedVal,
        };
      });

      this.columns = [];

    }).catch(err => {
      console.log(err)
    })
}

filteredTenant() {
  this._dataTablesService.searchUserList(this.username).then((data: any) => {
  //formattedVal is define for return user roles values and join it with the bases of coma
    this.data = data.result.items.map((r) => {
    let formattedVal = r.usersRoles.map((k) => k.roleId.name).join(',');
    return {
      ...r,
      usersRoles: formattedVal,
    };
  });

  this.columns = [];
  }).catch(err => {
    console.log(err)
  })
}

search(){
    if(this.username == ""){
      this.ngOnInit()
    }
    else{
      
      this.data = this.filteredTenant()
    }
  
  // setTimeout(searchByName , 5000)

 
}
}

