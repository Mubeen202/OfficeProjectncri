import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { TenantService } from 'app/main/setup/tenant.services';
import { UserListService } from 'app/main/setup/user-list.service';

@Component({
  selector: 'app-new-company-sidebar',
  templateUrl: './new-company-sidebar.component.html'
})
export class NewCompanySidebarComponent implements OnInit {
  public fullname;
  public username;
  public tenant;
  public status = 'true';
  public tenantList=[]


  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {TenantService} _tenantList
   * @param {UserListService} _userList
   */
  constructor(private _coreSidebarService: CoreSidebarService, private _tenantList: TenantService,
    private _userList: UserListService) {}

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  onSelected(status){
    this.status = status
   }

   
   tenantSelected(tenant){
    this.tenant = tenant
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
        code: this.username,
        name:this.fullname,
        tenantId:this.tenant,
        isActive:this.status,
        created_by : user,
        updated_by:user
      }
      console.log("🚀 ~ file: new-company-sidebar.component.ts ~ line 57 ~ NewCompanySidebarComponent ~ submit ~ value", value)
      
      this._userList.addCompany(value).then((dataResponse: any) => {  
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

  getTenantList() {
    this._tenantList.tenantList().then((data: any) => {
      this.tenantList = data.result.items
      console.log("🚀 ~ file: new-company-sidebar.component.ts ~ line 48 ~ NewCompanySidebarComponent ~ this._tenantList.tenantList ~ this.tenantList", this.tenantList)
    }).catch(err => {
      console.log(err)
    })
}


  ngOnInit(): void {
    this.getTenantList()
  }
}
