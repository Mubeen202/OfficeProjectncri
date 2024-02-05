import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { RoleService } from 'app/main/setup/roles-edit/role-edit.service';
@Component({
  selector: 'app-new-roles-sidebar',
  templateUrl: './new-roles-sidebar.component.html',
  styleUrls: ['./new-roles-sidebar.component.scss']
})
export class NewRolesSidebarComponent implements OnInit {
  public fullname;
  public username;
  public status;
  public name;
  public onSelected;


  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {RoleServices} _roleService
   */
  constructor(private _coreSidebarService: CoreSidebarService,
    private _roleService: RoleService ,
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
   * Submit
   *
   * @param form
   */
   submit(form) {
    if (form.valid) {
      console.log("🚀 ~ file: new-roles-sidebar.component.ts ~ line 43 ~ NewRolesSidebarComponent ~ submit ~ form", form)
      
    let user = JSON.parse(localStorage.getItem('currentUser')).id

      let value = {
        code:this.fullname,
        name:this.name,
        created_by : user,
        updated_by:user
      }
      console.log("🚀 ~ file: new-company-sidebar.component.ts ~ line 57 ~ NewCompanySidebarComponent ~ submit ~ value", value)
      
      this._roleService.addRole(value).then((dataResponse: any) => {  
        alert(dataResponse?.message)
        window.location.reload()
      },
      error=>{
        alert(error.error.errors.code)
      }
      ).catch((error) => {
        console.log('sddsfas', error)
        // alert(dataResponse?.message)
      })
    }
  }

  ngOnInit(): void {}
}
