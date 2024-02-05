import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserListService } from 'app/main/setup/user-list.service';
import { DepartmentEditService } from 'app/main/setup/department-edit/department-edit.service';
@Component({
  selector: 'app-new-department-sidebar',
  templateUrl: './new-department-sidebar.component.html',
  styleUrls: ['./new-department-sidebar.component.scss']
})
export class NewDepartmentSidebarComponent implements OnInit {
  public fullname;
  public code;
  public status;
  public location;
  public companyList =[]
  public tenantList =[]
  public selectedVal;


  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {UserListService} _comapnayService
   * @param {DepartmentEditService} _departmentService
   */
  constructor(private _coreSidebarService: CoreSidebarService,
    private _comapnayService: UserListService,
    private _departmentService: DepartmentEditService,

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
    let user = JSON.parse(localStorage.getItem('currentUser')).id

      let value = {
        code: this.code,
        name:this.fullname,
        companyId:this.selectedVal,
        location:this.location,
        created_by : user,
        updated_by:user
      }
      console.log("🚀 ~ file: new-company-sidebar.component.ts ~ line 57 ~ NewCompanySidebarComponent ~ submit ~ value", value)
      
      this._departmentService.addDepartment(value).then((dataResponse: any) => {  
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

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedVal =event.target.value ;
  }

  getCompanyList() {
    this._comapnayService.getCompanyInformation().then((data: any) => {
      this.companyList = data.result.items
      console.log("🚀 company", data.result.items)
    }).catch(err => {
      console.log(err)
    })
}



  ngOnInit(): void {
    this.getCompanyList()
  }
}
