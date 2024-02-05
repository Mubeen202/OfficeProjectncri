import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { TenantService } from 'app/main/setup/tenant.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-tenant-sidebar',
  templateUrl: './new-user-sidebar.component.html'
})
export class NewUserSidebarComponent implements OnInit {
  public fullname;
  public username;
  public access;
  public status = 'true';
    


  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {TenantService} _tenantService
   * @param {Router} router
   */
  constructor(private _coreSidebarService: CoreSidebarService,
    private router: Router,
     private _tenantService: TenantService) {}

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

   onSelected(status){
    this.status = status
   }
  submit(form) {
    let user = JSON.parse(localStorage.getItem('currentUser')).id

    if (form.valid) {
      let value = {
        code: this.username,
        name:this.fullname,
        accessLevel:this.access,
        isActive:this.status,
        created_by : user,
        updated_by:user
      }
      this._tenantService.addTenant(value).then((dataResponse: any) => {  
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

  ngOnInit(): void {
    
  }
}
