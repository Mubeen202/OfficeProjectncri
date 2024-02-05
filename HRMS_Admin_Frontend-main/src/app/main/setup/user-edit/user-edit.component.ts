import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';

import { UserEditService } from './user-edit.service';
import { RoleService } from '../roles-edit/role-edit.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  public musa = 'musa'
  public tempRow;
  public roleList = []
  public userRolesValues = []
  public roleId;
  public roleUserId;
  public defaultRoleId;
  public defaultRoleName;
  public checkbox: {}
  public checkBoxArray: any = []
  public unCheckBoxArray: any = []
  public checkboxArray: any = []
  public finalArray: any = []
  public userList: any = []
  public finalEditionArray: any = []
  public recordGettingData: any = []

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
   * @param {RoleService} _roleService
   */
  constructor(private router: Router, private _roleService: RoleService,
    private _userEditService: UserEditService) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset Form With Default Values
   */
  resetFormWithDefaultValues() {
    this.accountForm.resetForm(this.tempRow);
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


  onChange(event) {
    let id = event.target.value;
    let checked = event.target.checked
    this.checkboxArray.map((item) => {
      if (item.id == id) {
        item.selected = checked
        return item
      }
      return item
    })


  }




  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    
    this.checkboxArray.map((newVal) => {
      this.userRolesValues.map((roles) => {
        if (newVal.id == roles.roleId.id && newVal.selected !== false) {
          let v = {
            id: roles.id,
            roleId: roles.roleId.id,
            created_by: user,
            updated_by: user
          }
          return this.finalArray.push(v)
        }


      })
    })
    let comparison = (a, b) => a.id !== b.id
    let secondArray = this.checkboxArray.filter(b => this.userList.every(a => comparison(a, b)));
    let newRole = secondArray.map((item) => {
      if (item.selected !== false) {
        return {
          roleId: item.id,
          created_by: user,
          updated_by: user
        }
      }
    })

    let results = this.finalArray.concat(newRole);
    const userRoles = results.filter(element => {
      return element !== undefined;
    })
    if (form.valid) {

      let value = {
        email: this.currentRow.email,
        password: this.currentRow.password,
        username: this.currentRow.username,
        full_name: this.currentRow.full_name,
        isActive: this.currentRow.isActive,
        usersRoles: userRoles
      }

      this._userEditService.editUser(value).then((data: any) => {
        alert('User Updation successfully')
        this.router.navigateByUrl('user-management')
      },
        error => {
          console.log('thi is error', error)

        }).catch(error => {
          console.log('this is error in catch', error)
        });



    }
  }

  getRoleList() {
    this._roleService.gettAllRoles().then((data: any) => {
      this.roleList = data.result.items

      this.userList = this.userRolesValues.map((item) => {
        return { ...item.roleId, seleted: false }
      })



      let comparison = (a, b) => a.id !== b.id
      let b = this.roleList.filter(b => this.userList.every(a => comparison(a, b)));



      this.unCheckBoxArray = b.map((item) => {
        return {
          ...item,
          selected: false
        }
      })
      this.checkboxArray = this.checkBoxArray.concat(this.unCheckBoxArray);

    })






  }
  roleSelected(tenant) {
    this.roleId = tenant
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.getRoleList()
    this._userEditService.onUserEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      if (response.result.items.id == this.urlLastValue) {
        this.currentRow = response.result.items;
        this.userRolesValues = this.currentRow.usersRoles
        this.checkBoxArray = this.userRolesValues.map((item) => {
          return {
            ...item.roleId,
            selected: true
          }
        })
      }
    });


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

