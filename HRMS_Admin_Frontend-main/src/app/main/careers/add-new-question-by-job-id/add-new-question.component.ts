import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserlistService } from '../joblisting/userlist.service';
import { FileUploader } from 'ng2-file-upload';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'app/main/components/_helpers/must-match.validator';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { QuestionListService } from '../joblisting/question.service';
import { CompanyEditService } from 'app/main/setup/company-edit/company-edit.service';
import { DepartmentEditService } from 'app/main/setup/department-edit/department-edit.service';
import { UserEditService } from 'app/main/setup/user-edit/user-edit.service';
@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class AddNewQuestionComponentForJob implements OnInit {
  public value;
  public questionList=[]
@ViewChild('textQuestionForm') textQuestionForm: NgForm;
@ViewChild('radioQuestionForm') radioQuestionForm: NgForm;
@ViewChild('checkboxQuestionForm') checkboxQuestionForm: NgForm;
@ViewChild('uploadQuestionForm') uploadQuestionForm: NgForm;


 public ReactiveUserDetailsForm: UntypedFormGroup;
  public ReactiveUDFormSubmitted = false;
  public uploader: FileUploader = new FileUploader({
  
    isHTML5: true
  });

     // Reactive User Details form data
  public UDForm = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confPassword: '',
    age: '',
    phoneNumber: '',
    jobtitle: '',
    questions:''
    
    
  };

rows = [
    { questions: 'Do you have the required experience?', email:'wiwlirug@talgajup.co.uk', clientquestions: 'ABC Bank', source: 'Martin', appliedDate: '13-02-22', candidateStage: 'Hired', Rating:'3', id:'check1' },
    { questions: 'Cover Letter', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Fido', source: 'Jacob', appliedDate: '22-02-23', candidateStage: 'Engaged', Rating:'2', id:'check2'},
    { questions: 'Resume ', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Dubai Bank', source: 'Dean', appliedDate: '13-05-23', candidateStage: 'Not hired', Rating:'3' , id:'check3'},
    { questions: 'Are you proficient in English? ', email:'wiwlirug@talgajup.co.uk', clientquestions: 'ABC Bank', source: 'Sam', appliedDate: '04-12-22', candidateStage: 'Hired', Rating:'check4'},
    { questions: 'Portfolio ', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Dealer', source: 'Samantha', appliedDate: '13-02-22', candidateStage: 'Hired',Rating:'3', id:'check5'},
    { questions: 'College/Education', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Company', source: 'Jessica', appliedDate: '13-02-22', candidateStage: 'Engaged',Rating:'3', id:'check6' },
    { questions: 'Portfolio', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Swiss Bank', source: 'Hayden', appliedDate: '13-02-22', candidateStage: 'Not hired',Rating:'1', id:'check7'},
    { questions: 'Education ', email:'wiwlirug@talgajup.co.uk', clientquestions: 'ABC Bank', source: 'Luther', appliedDate: '13-02-22', candidateStage: 'Not hired',Rating:'2', id:'check8' },
    
  ];
  
  // Public
  public sidebarToggleRef = false;
  
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public finalArray:any=[]
  public exportCSVData;
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previouscandidateStageFilter = '';
  public jobsQuestions;
  public checkBoxArray;
  public checkboxArray;
  public unCheckBoxArray;
  public allQuestionList;
  public jobId = Boolean;
  public selectRole: any = [
    { questions: 'All', value: '' },
    { questions: 'Admin', value: 'Admin' },
    { questions: 'Author', value: 'Author' },
    { questions: 'Editor', value: 'Editor' },
    { questions: 'Maintainer', value: 'Maintainer' },
    { questions: 'Subscriber', value: 'Subscriber' }
  ];

   public selectPlan: any = [
    { questions: 'All', value: '' },
    { questions: 'Basic', value: 'Basic' },
    { questions: 'Company', value: 'Company' },
    { questions: 'Enterprise', value: 'Enterprise' },
    { questions: 'Team', value: 'Team' }
  ];

  public selectcandidateStage: any = [
    { questions: 'All', value: '' },
    { questions: 'Engaged', value: 'Engaged' },
    { questions: 'Hired', value: 'Hired' },
    { questions: 'InHired', value: 'InHired' }
  ];

  public selectedRole = [];
  public selectedPlan = [];
  public selectedcandidateStage = [];
  public searchValue = '';
  public currentRow 
  public departList = []
  public allQuestionArray = []
  public companiesList = []
  public defaultDepartmentId;
  public defaultRecruiterId;
  public defaultManagerId;
  public defaultCompanyId;
  public departmentId;
  public companyId;
  public managerId;
  public recruiterId;
  public checkbox: {}
  public urlLastValue;
  public url;
  public manager;
  public recruiter;
  public userData;

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

    // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

/**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {UserlistService} jobs
   * @param {CoreSidebarService} _coreSidebarService
   */


  constructor(
    private jobs: UserlistService,
    private questions: QuestionListService,
    private router: Router,
    private _coreSidebarService: CoreSidebarService,
    private departmentList: DepartmentEditService,
    private users:UserEditService,
    private companyList: CompanyEditService,
    private _coreConfigService: CoreConfigService,
    private formBuilder: UntypedFormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

   get ReactiveUDForm() {
    return this.ReactiveUserDetailsForm.controls;
  }
  chooseField(event){
    this.value = event.target.value;
  }

  multipleChoiceSubmit(event){
  console.log("🚀 ~ file: add-new-", event.target.value)

  }
   ReactiveUDFormOnSubmit() {
    this.ReactiveUDFormSubmitted = true;

    // stop here if form is invalid
    // if (this.ReactiveUserDetailsForm.invalid) {
    //   return;
    // }
    console.log(this.ReactiveUserDetailsForm.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.ReactiveUserDetailsForm.value));
  }

   // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedRole = this.selectRole[0];
    this.selectedPlan = this.selectPlan[0];
    this.selectedcandidateStage = this.selectcandidateStage[0];

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.fullquestions.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param questions
   */
  toggleSidebar(questions): void {
    this._coreSidebarService.getSidebarRegistry(questions).toggleOpen();
  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousPlanFilter, this.previouscandidateStageFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By Plan
   *
   * @param event
   */
  filterByPlan(event) {
    const filter = event ? event.value : '';
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, filter, this.previouscandidateStageFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By candidateStage
   *
   * @param event
   */
  filterBycandidateStage(event) {
    const filter = event ? event.value : '';
    this.previouscandidateStageFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
    this.rows = this.temp;
  }

  /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param candidateStageFilter
   */
  filterRows(roleFilter, planFilter, candidateStageFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    roleFilter = roleFilter.toLowerCase();
    planFilter = planFilter.toLowerCase();
    candidateStageFilter = candidateStageFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialquestionsMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      const isPartialGenderMatch = row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
      const isPartialcandidateStageMatch = row.candidateStage.toLowerCase().indexOf(candidateStageFilter) !== -1 || !candidateStageFilter;
      return isPartialquestionsMatch && isPartialGenderMatch && isPartialcandidateStageMatch;
    });
  }

  onSubmit(){
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    this.checkboxArray.map((newVal) => {
      this.jobsQuestions.map((roles) => {
        if (newVal.id == roles.questionId.id && newVal.selected !== false) {
          let v = {
            id: roles.id,
            flag:newVal.flag,
            questionId: roles.questionId.id,
            created_by: user,
            updated_by: user
          }
          return this.finalArray.push(v)
        }


      })
    })
    let comparison = (a, b) => a.id !== b.id
    let secondArray = this.checkboxArray.filter(b => this.allQuestionList.every(a => comparison(a, b)));
    let newRole = secondArray.map((item) => {
      if (item.selected !== false) {
        return {
          questionId: item.id,
          flag:item.flag,
          created_by: user,
          updated_by: user
        }
      }
    })
    let results = this.finalArray.concat(newRole);
    const jobRelatedQuestions = results.filter(element => {
      return element !== undefined;
    })
    const {jobsQuestions='default value', ...secondObject} = {...this.currentRow};
    let value = {
      ...secondObject,
      companyName: this.defaultCompanyId,
      department:this.defaultDepartmentId,
      accountManager:this.defaultManagerId,
      assignRecruiter:this.defaultRecruiterId,
      jobsQuestions: jobRelatedQuestions || this.jobsQuestions
    }

    this.jobs.editJob(value).then((dataResponse: any) => {  
      console.log("🚀 ~ file: add-job-opening.component.ts ~ line 172 ~ AddJobOpeningComponent ~ this.jobs.addJob ~ dataResponse", dataResponse)
      alert('Job Related Questions Save Successfully')
       // window.location.reload()
      this.router.navigateByUrl(`careers/job-draft/${dataResponse.result.items.id}`)
      localStorage.setItem('jobId', JSON.stringify(dataResponse.result.items.id))
     },
     error=>{
       alert(error.error.errors.code)
     }
     ).catch((error) => {
       console.log('sddsfas', error)
       alert(error.message)
     })

  }

  getAllCompanies() {
    this.companyList.getCompanyInformation().then((data: any) => {
      this.companiesList = data.result.items

      this.companiesList.filter(item => {
        if (this.currentRow.companyName == item.name
        ) {
          this.defaultCompanyId = item.id
        }
      })

    }).catch(err => {
      console.log(err)
    })
  }

  getAllDepartments() {
    this.departmentList.gettAllDepartments().then((data: any) => {
      this.departList = data.result.items
      console.log("🚀 ~ file: company-edit.component.ts ~ line 93 ~ CompanyEditComponent ~ this._tenantList.tenantList ~ this.tenantList", this.departList)
      this.departList.filter(item => {
        if (this.currentRow.department == item.name
        ) {
          this.defaultDepartmentId = item.id
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }
  getAllUsers() {
    this.users.gettAllUsers().then((data: any) => {
      //formattedVal is define for return user roles values and join it with the bases of coma
      this.userData = data.result.items.map((r) => {
        let formattedVal = r.usersRoles.map((k) =>{return  k.roleId.name}).join(',')
        return {
          ...r,
          usersRoles: formattedVal,
        };
      });
  
  
     let recruiter = this.userData.map((recruiter)=>{
      if(recruiter.usersRoles.includes('Recruiter')==true){
        return recruiter
      }
     
     })
  
     let accountManager = this.userData.map((recruiter)=>{
      if(recruiter.usersRoles.includes('Account Manager')==true){
        return recruiter
      }
     
     })
  
     this.recruiter = recruiter.filter(i=> {return i !== undefined})
     this.manager = accountManager.filter(i=> {return i !== undefined})

     this.recruiter.filter(item => {
      if (this.currentRow.assignRecruiter == item.full_name
      ) {
        this.defaultRecruiterId = item.id
      }
    })
    this.manager.filter(item => {
      if (this.currentRow.accountManager == item.full_name
      ) {
        this.defaultManagerId = item.id
      }
    })
  
     console.log("🚀 ~ file: add-job-opening.component.ts:178 ~ AddJobOpeningComponent ~ recruiter ~ recruiter", this.recruiter)
     console.log("🚀 ~ file: add-job-opening.component.ts:178 ~ AddJobOpeningComponent ~ recruiter ~ recruiter", this.manager)
     console.log("🚀 ~ file: add-job-opening.component.ts:178 ~ AddJobOpeningComponent ~ recruiter ~ recruiter", this.defaultManagerId)
     console.log("🚀 ~ file: add-job-opening.component.ts:178 ~ AddJobOpeningComponent ~ recruiter ~ recruiter", this.defaultRecruiterId)
  
      console.log("🚀 ~ file: add-job-opening.component.ts:173 ~ AddJobOpeningComponent ~ this.userData=data.result.items.map ~ this.userData", this.userData)
  
  
    }).catch(err => {
      console.log(err)
    })
  }
  

  onSubmitEdit(){
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    this.checkboxArray.map((newVal) => {
      this.jobsQuestions.map((roles) => {
        if (newVal.id == roles.questionId.id && newVal.selected !== false) {
          let v = {
            id: roles.id,
            flag:newVal.flag,
            questionId: roles.questionId.id,
            created_by: user,
            updated_by: user
          }
          return this.finalArray.push(v)
        }


      })
    })
    let comparison = (a, b) => a.id !== b.id
    let secondArray = this.checkboxArray.filter(b => this.allQuestionList.every(a => comparison(a, b)));
    let newRole = secondArray.map((item) => {
      if (item.selected !== false) {
        return {
          questionId: item.id,
          flag:item.flag,
          created_by: user,
          updated_by: user
        }
      }
    })
    let results = this.finalArray.concat(newRole);
    const jobRelatedQuestions = results.filter(element => {
      return element !== undefined;
    })
    const {jobsQuestions='default value', ...secondObject} = {...this.currentRow};
    let value = {
      ...secondObject,
      companyName: this.defaultCompanyId,
      department:this.defaultDepartmentId,
      accountManager:this.defaultManagerId,
      assignRecruiter:this.defaultRecruiterId,
      jobsQuestions: jobRelatedQuestions || this.jobsQuestions
    }

    this.jobs.editJob(value).then((dataResponse: any) => {  
      console.log("🚀 ~ file: add-job-opening.component.ts ~ line 172 ~ AddJobOpeningComponent ~ this.jobs.addJob ~ dataResponse", dataResponse)
      alert('Job Related Questions Save Successfully')
       // window.location.reload()
      localStorage.setItem('jobId', JSON.stringify(dataResponse.result.items.id))
      this.router.navigateByUrl(`careers/job-edit/${dataResponse.result.items.id}`)
     },
     error=>{
       alert(error.error.errors.code)
     }
     ).catch((error) => {
       console.log('sddsfas', error)
       alert(error.message)
     })
    console.log("🚀 ~ file: add-new-question.component.ts:292 ~ AddNewQuestionComponentForJob ~ onSubmit ~ value", value)

  }

  getAllQuestions() {
    this.questions.gettAllQuestions().then((data: any) => {
      this.questionList = data.result.items
      this.allQuestionList = this.jobsQuestions.map((item) => {
        return {
          ...item.questionId,
          selected: false
        }
      })
      let comparison = (a, b) => a.id !== b.id
      let b = this.questionList.filter(b => this.allQuestionList.every(a => comparison(a, b)));



      this.unCheckBoxArray = b.map((item) => {
        return {
          ...item,
          selected: false,
          flag:false
        }
      })
      this.checkboxArray = this.checkBoxArray.concat(this.unCheckBoxArray);
      console.log("🚀 ~ file: job-edit.component.ts:220 ~ JobEditComponent ~ this.jobs.gettAllQuestions ~ this.checkboxArray", this.checkboxArray)

    

    }).catch(err => {
      console.log(err)
    })
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

  onChangeRequried(data,id){
    this.checkboxArray= this.checkboxArray.map((item)=>{

      if(item.id==data){
        console.log('jjeeee', item)

        item.flag = id
         return item
      }
      else{
        return item
      }
    })
    console.log('jjeeee', this.checkBoxArray)
    
    }

  // submitText(form){
  //   let user = JSON.parse(localStorage.getItem('currentUser')).id
  //   if(form.valid){
  //     let value ={
  //       type:'text',
  //       question:form.value.text,
  //       created_by : user,
  //       updated_by:user
  //     }
  //     this.questions.addQuestion(value).then((dataResponse: any) => {  
  //       console.log("🚀 ~ file: add-new-question.component.ts ~ line 293 ~ AddNewQuestionComponent ~ this._userListService.addQuestion ~ dataResponse", dataResponse)
  //       alert("Question Created Successfully")
  //       window.location.reload()
  //     },
  //     error=>{
  //       alert(error.error.errors.code)
  //     }
  //     ).catch((error) => {
  //       console.log('sddsfas', error)
  //       // alert(dataResponse?.message)
  //     })
      
  //   }
  //   else{
  //     alert('some thing went wrong please try again !')
  //   }
    
  // }


  // submitUpload(form){
  //   let user = JSON.parse(localStorage.getItem('currentUser')).id
  //   if(form.valid){
  //     let value ={
  //       type:'upload',
  //       question:form.value.text,
  //       created_by : user,
  //       updated_by:user
  //     }
  //     this.questions.addQuestion(value).then((dataResponse: any) => {  
  //       // alert(dataResponse?.message)
  //       alert("Question Created Successfully")
  //       window.location.reload()
  //     },
  //     error=>{
  //       alert(error.error.errors.code)
  //     }
  //     ).catch((error) => {
  //       console.log('sddsfas', error)
  //       // alert(dataResponse?.message)
  //     })
      
  //   }
  //   else{
  //     alert('some thing went wrong please try again !')
  //   }
    
  // }

  // submitRadio(form){
  //   let user = JSON.parse(localStorage.getItem('currentUser')).id
  //   if(form.valid){
  //     let value ={
  //       type:'radio',
  //       question:form.value.text,
  //       created_by : user,
  //       updated_by:user
  //     }
  //     this.questions.addQuestion(value).then((dataResponse: any) => {  
  //       // alert(dataResponse?.message)
  //       alert("Question Created Successfully")
  //       window.location.reload()
  //     },
  //     error=>{
  //       alert(error.error.errors.code)
  //     }
  //     ).catch((error) => {
  //       console.log('sddsfas', error)
  //       // alert(dataResponse?.message)
  //     })
      
  //   }
  //   else{
  //     alert('some thing went wrong please try again !')
  //   }
    
  // }

  onHandleRequired(Pname:any){
    console.log("jjjjjj",Pname.defaultvalue)
  }



 ngOnInit(): void {
  //get job by id 
  this.getAllQuestions()
  this.getAllDepartments()
  this.getAllCompanies() 
  this.getAllUsers()
  this.jobs.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    if (response.result.items.id) {
      this.currentRow = response.result.items
      this.jobsQuestions = response.result.items.jobsQuestions
      this.checkBoxArray = this.jobsQuestions.map((item) => {
        return {
          ...item.questionId,
          selected: true,
          flag:item.flag
        }
      })

    
    }
  })

  



  
    // // Subscribe config change
    // this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
    //   //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
    //   if (config.layout.animation === 'zoomIn') {
    //     setTimeout(() => {
    //       this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //         this.rows = response;
    //         this.tempData = this.rows;
    //         this.exportCSVData = this.rows;
    //       });
    //     }, 450);
    //   } else {
    //     this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //       this.rows = response;
    //       this.tempData = this.rows;
    //       this.exportCSVData = this.rows;
         
    //     });
    //   }
    // });


    
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
