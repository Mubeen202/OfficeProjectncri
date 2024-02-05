import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProfileService } from './profile.service';
import { CandidatePoolService } from '../candidate-pool/candidate-pool.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class Profile implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  public data: any;
  public toggleMenu = true;
  public Monthly = false;
  public toggleNavbarRef = false;
  public loadMoreRef = false;
  public currrentRow: any={};


  // private
  private _unsubscribeAll: Subject<any>;
  public imageState: Boolean=false;

  /**
   * Constructor
   *
   * @param {PricingService} _pricingService
   * @param {CandidatePoolService} _candidateService
   */
  constructor(private _pricingService: ProfileService, private _candidateService: CandidatePoolService, private sanitizer: DomSanitizer) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Load More
   */
  loadMore() {
    this.loadMoreRef = !this.loadMoreRef;
    setTimeout(() => {
      this.loadMoreRef = !this.loadMoreRef;
    }, 2000);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._pricingService.onPricingChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.data = response;
    });

    this._pricingService.onCandidteChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.currrentRow = response.result.items;
   
    
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Profile',
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
            name: 'Pages',
            isLink: true,
            link: '/'
          },
          {
            name: 'Profile',
            isLink: false
          }
        ]
      }
    };
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

