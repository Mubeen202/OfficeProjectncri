
import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';

import { CompanyEditService } from './company-edit.service';
import { TenantService } from '../tenant.services';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit, OnDestroy {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  public tenantCustom={}
  public musa='musa'
  public tempRow;
  public tenantId : string;
  public avatarImage: string;
  public tenantList=[]
  public tenant:string
  @ViewChild('accountForm') accountForm: NgForm;

  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };

  public selectMultiLanguages = ['English', 'Spanish', 'French', 'Russian', 'German', 'Arabic', 'Sanskrit'];
  public selectMultiLanguagesSelected = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserEditService} _userEditService
   * @param {TenantService} _tenantList
   */
  constructor(private router: Router,
     private _userEditService: CompanyEditService,
     private _tenantList: TenantService,
     ) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset Form With Default Values
   */
  resetFormWithDefaultValues() {
    this.router.navigateByUrl('setup/company-list')
    // this.accountForm.resetForm(this.tempRow);
  }

  

  /**
   * Upload Image
   *
   * @param event
   */
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }


  getTenantList() {
    this._tenantList.tenantList().then((data: any) => {
      this.tenantList = data.result.items
      console.log("🚀 ~ file: company-edit.component.ts ~ line 93 ~ CompanyEditComponent ~ this._tenantList.tenantList ~ this.tenantList", this.tenantList)
      this.tenantList.filter(item=> {
        if(this.currentRow.tenantId == item.name
          ){
          this.tenantId = item.id
        }
      })
    }).catch(err => {
      console.log(err)
    })
}

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    if (form.valid) {
      let value = {
        code:this.currentRow.code,
        name:this.currentRow.name,
        tenantId:this.tenant || this.tenantId,
        isActive:this.currentRow.isActive,
        updated_by:user

      }

      this._userEditService.editCompany(value).then((data:any)=>{
       alert(data.message)
       this.router.navigateByUrl('setup/company-list')
      },
      error=>{
        console.log('thi is error', error)

      }).catch(error=>{
        console.log('this is error in catch', error)
      });
      
      
    
    }
  }

  tenantSelected(tenant){
    this.tenant = tenant
   }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {

    this.getTenantList()
    this._userEditService.onUserEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      if(response.result.items.id == this.urlLastValue){
        this.currentRow = response.result.items;
        // this.currentRow.filter((item)=>{

        //   if(item.tenantId == this.tenantList){
            
        //   }
        // })
        console.log("🚀 ~ file: company-edit.component.ts ~ line 123 ~ CompanyEditComponent ~ this._userEditService.onUserEditChanged.pipe ~ this.currentRow ", this.currentRow )
      }
      
   
      // this.rows.map(row => {
      //   if (row.id == this.urlLastValue) {
      //     this.currentRow = row;
      //     // this.avatarImage = this.currentRow.avatar;
      //     this.tempRow = cloneDeep(row);
      //   }
      // });
    });

    // console.log('username', this.currentRow)

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
