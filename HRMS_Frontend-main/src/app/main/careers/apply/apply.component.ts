import { Component, OnDestroy, OnInit, ViewEncapsulation , Input} from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';



@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit, OnDestroy {
  @Input() careerJobId:string; 
  // public
  public apiData;
  public urlLastValue;
  public url = this.router.url;
  public sidebarToggleRef = false;
  public paymentSidebarToggle = false;
   public coreConfig: any;
 

  

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {InvoicePreviewService} _invoicePreviewService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private router: Router,
    
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,

    
  ) 
  {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
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

  // Public Methods
  // -----------------------------------------------------------------------------------------------------



  
  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
 
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
   
  }
}
