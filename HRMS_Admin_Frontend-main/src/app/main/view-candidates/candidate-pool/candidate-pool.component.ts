import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CandidatePoolService } from './candidate-pool.service';
import { UserlistService } from 'app/main/careers/joblisting/userlist.service';

@Component({
  selector: 'app-candidate-pool',
  templateUrl: './candidate-pool.component.html',
  styleUrls: ['./candidate-pool.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CandidatePoolComponent implements OnInit {
  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  // public
  public url = this.router.url;

  public contentHeader: object;
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
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  public data: any=[];
  columns:[];
  statsJobs: any;


  // Public Methods
  // -----------------------------------------------------------------------------------------------------

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
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * Row Details Toggle
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  /**
   * For ref only, log selected values
   *
   * @param selected
   */
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onChnageUrl(data){
    localStorage.setItem('candidateId', JSON.stringify(data.id))
    // if(data.isActive =='active'){
    this.router.navigateByUrl(`view-candidates/profile/${data.id}`)
  
    // }
    // else if(data.isActive== 'inactive'){
    // this.router.navigateByUrl(`careers/job-draft/${data.id}`)
    // console.log("🚀 ~ file: joblisting.component.ts ~ line 154 ~ JoblistingComponent ~ onChnageUrl ~ url", data)
  
    // }
  
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
   * @param {CandidatePoolService} _candidateService
   * @param {CoreTranslationService} _coreTranslationService
   * @param {Router} router
   */
  constructor(private _candidateService: UserlistService, private router: Router ) {
    this._unsubscribeAll = new Subject();

  }

  getCandidateList() {
    this._candidateService.getAllCandidates().then((data: any) => {
      this.data = data.result.items
      this.data.filter(item=>{
        if(item.isActive==true){
          item.isActive='active',
          item.lastName= `${item.firstName} ${item.lastName}`
        }
        if(item.isActive==false){
          item.isActive ='inactive',
          item.lastName= `${item.firstName} ${item.lastName}`
        }
      
      })
      console.log('jjjjdkdjfk', this.data)
      this.columns = [];
    }).catch(err => {
      console.log(err)
    })
}

getJobList() {
  this._candidateService.gettAllJobs().then((data: any) => {
    this.statsJobs = data.result
    
  }).catch(err => {
    console.log(err)
  })
}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.getCandidateList();
    this.getJobList()


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
}
