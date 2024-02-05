import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';

import { TenantEditService } from './tenant-edit.service';

@Component({
  selector: 'app-tenant-edit',
  templateUrl: './tenant-edit.component.html',
  styleUrls: ['./tenant-edit.component.scss']
})
export class TenantEditComponent implements OnInit, OnDestroy {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  public musa='musa'
  public tempRow;
  public avatarImage: string;

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
   */
  constructor(private router: Router, private _userEditService: TenantEditService) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset Form With Default Values
   */
  resetFormWithDefaultValues() {
    
    // this.accountForm.removeFormGroup(this.tempRow);
    this.router.navigateByUrl('/setup/tenant-list')
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

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      let user = JSON.parse(localStorage.getItem('currentUser')).id
      let value = {
        code:this.currentRow.code,
        name:this.currentRow.name,
        accessLevel:this.currentRow.accessLevel,
        isActive:this.currentRow.isActive,
        updated_by:user
      }

      this._userEditService.editTenant(value).then((data:any)=>{
       alert(data.message)
       this.router.navigateByUrl('/setup/tenant-list')
      },
      error=>{
        console.log('thi is error', error)

      }).catch(error=>{
        console.log('this is error in catch', error)
      });
      
      
    
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {

    this._userEditService.onUserEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      if(response.result.items.id == this.urlLastValue){
        this.currentRow = response.result.items;
      }
      
      console.log("🚀 ~ file: tenant-edit.component.ts ~ line 97 ~ TenantEditComponent ~ this._userEditService.onUserEditChanged.pipe ~ rows", response.result.items.id)
   
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
