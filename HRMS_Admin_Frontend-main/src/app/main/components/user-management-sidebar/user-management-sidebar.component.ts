import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserEditService } from 'app/main/setup/user-edit/user-edit.service';
import { RoleService } from 'app/main/setup/roles-edit/role-edit.service';
@Component({
  selector: 'app-user-management-sidebar',
  templateUrl: './user-management-sidebar.component.html',
  styleUrls: ['./user-management-sidebar.component.scss']
})
export class UserManagementSidebarComponent implements OnInit {
  public fullname;
  public username;
  public status;
  public email;
  public onSelected;
  public password;
  public retypePassword;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  public roleList =[]
  public selectedVal;
  public checkbox:{}
  public checkBoxArray:any =[]


  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {UserEditService} _userService
   * @param {RoleService} _roleService
   */
  constructor(private _coreSidebarService: CoreSidebarService,
    private _userService: UserEditService,private _roleService: RoleService,
    ) {}

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  
  /**
   * Toggle Password Text Type New
   */
  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  onChange(options:string, isChecked: boolean) {
    const checkbox = this.checkBoxArray;
    let user = JSON.parse(localStorage.getItem('currentUser')).id
  
    if(isChecked) {
      let value = {
        roleId: options,
        created_by : user,
        updated_by:user
      }
      checkbox.push(value);
      
      
    } else {
      let value = checkbox.filter(i => {return (i == options)})
      
      const id = checkbox.indexOf(value.toString()); // 2
      const removed = checkbox.splice(id,  1);
    }
  
    
    this.checkbox =checkbox
    
  
    console.log("🚀 ~ file: add-job-opening.component.ts ~ line 111 ~ AddJobOpeningComponent ~ onChange ~ this.checkbox", this.checkbox)
  
  }

  /**
   * Toggle Password Text Type Retype
   */
  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
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
        username:this.username,
        full_name:this.fullname,
        email:this.email,
        password:this.password,
        isActive:this.status,
        usersRoles:this.checkbox
       
      }
      
      this._userService.addUser(value).then((dataResponse: any) => {  
        console.log("🚀 ~ file: user-management-sidebar.component.ts ~ line 83 ~ UserManagementSidebarComponent ~ this._userService.addUser ~ dataResponse", dataResponse)
        alert(dataResponse.user.message)
        window.location.reload()
      },
      error => {
        console.log("🚀 ~ file: user-management-sidebar.component.ts ~ line 88 ~ UserManagementSidebarComponent ~ submit ~ error", error)
        alert(error.errors.email)
      }
      ).catch((error) => {
        console.log('sddsfas', error)
        alert(error.message)
      })
    }
  }

  
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedVal =event.target.value ;
  }
  selectedStatus (event: any) {
    //update the ui
    this.status =event.target.value ;
  }
  getRoleList() {
    this._roleService.gettAllRoles().then((data: any) => {
      this.roleList = data.result.items
      console.log("🚀 roles", data.result.items)
    }).catch(err => {
      console.log(err)
    })
}
  ngOnInit(): void {
    this.getRoleList()
  }
}
