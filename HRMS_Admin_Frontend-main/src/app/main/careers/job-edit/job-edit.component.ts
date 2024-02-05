import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'app/main/components/_helpers/must-match.validator';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DepartmentEditService } from 'app/main/setup/department-edit/department-edit.service';
import { CompanyEditService } from 'app/main/setup/company-edit/company-edit.service';
import { UserEditService } from 'app/main/setup/user-edit/user-edit.service';
import { UserlistService } from '../joblisting/userlist.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { QuestionListService } from '../joblisting/question.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobEditComponent implements OnInit {
  public departmentStatus:Boolean=false

  public currentRow;
  public departList = []
  public allQuestionArray = []
  public companiesList = []
  public deptLocation = []
  public questionList = []
  public allQuestionList = []
  public factorQuestionList = []
  public allFactorQuestionList = []
  public defaultDepartmentId;
  public defaultLocation;
  public defaultRecruiterId;
  public defaultManagerId;
  public defaultCompanyId;
  public departmentId;
  public companyId;
  public managerId;
  public recruiterId;
  public checkbox: {}
  public checkBoxArray: any = []
  public unCheckBoxArray: any = []
  public factorCheckBoxArray: any = []
  public factorUnCheckBoxArray: any = []
  public jobsQuestions: any = []
  public jobsFactorQuestions: any = []
  public finalArray:any=[]
  public finalFactorArray:any=[]
  public checkboxArray: any = []
  public factorCheckboxArray: any = []
  public urlLastValue;
  public url;
  public manager;
  public recruiter;
  public userData;
  public selectedValue: string;

  
  // public
  public multipleValues = [{  value: '',  }];

  public item = {
    value: '',
  };
  public title: string;
  public sampleQuestion: string;

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  addItem() {
    this.multipleValues.push({
      value: '',
    });
  }

  /**
   * DeleteItem
   *
   * @param id
   */
  deleteItem(id) {
    for (let i = 0; i < this.multipleValues.length; i++) {
      if (this.multipleValues.indexOf(this.multipleValues[i]) === id) {
        this.multipleValues.splice(i, 1);
        break;
      }
    }
  }





  private _unsubscribeAll: Subject<any>;


  logos = [
    {
      id: '1',
      img: 'assets/images/logo/ziprecruiter.png',
    },
    {
      id: '2',
      img: 'assets/images/logo/indeed.png',
    },
    {
      id: '3',
      img: 'assets/images/logo/glassdoor.png',
    }


  ];

  public ReactiveUserDetailsForm: UntypedFormGroup;
  public ReactiveUDFormSubmitted = false;






  // Reactive User Details form data
  public UDForm = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    phoneNumber: '',
    jobtitle: '',


  };
  statsJobs: any;
  currency: any;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router,
    private modalService: NgbModal,
    private jobs: UserlistService,
    private questions: QuestionListService,
    private users:UserEditService,
    private departmentList: DepartmentEditService,
    private companyList: CompanyEditService,

  ) {
    this._unsubscribeAll = new Subject();
    // this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // getter for easy access to form fields
  get ReactiveUDForm() {
    return this.ReactiveUserDetailsForm.controls;
  }


  selectDepartmentChangeHandler(event) {
    this.departmentId = event
  }

  selectClientChangeHandler(event) {
    this.companyId = event
    this.departmentList.gettAllDepartmentsIds().then((data: any) => {
      let depatments = data.result.items.map((item)=>{
        
        this.departmentStatus= true
        if(item.companyId===this.companyId ){
          return item
        }})
      this.departList = depatments.filter((item)=>item !== undefined)
      let value = data.result.items.map((item)=>{if(item.companyId===this.companyId ){
        return item.location
      }})
      this.deptLocation = value.filter(i=>{return i !== undefined})
      console.log("🚀 ~ file: add-job-opening.component.ts:106 ~ AddJobOpeningComponent ~ this.departmentList.gettAllDepartments ~ this.departList", this.departList)
      console.log("🚀 ~ file: add-job-opening.comartList", this.deptLocation)
    
          }).catch(err => {
            console.log(err)
          })
  }

  selectRecruiterChangeHandler(event) {
    this.recruiterId = event
  }

  selectManagerChangeHandler(event) {
    this.managerId = event
  }

  onJobType(event) {
    console.log('jjjjjj', event.target.value)
  }
  onjobStatus(event) {
    console.log('jjjjjj', event.target.value)
  }



  getAllJobs() {
    this.jobs.gettAllJobs().then((data: any) => {
      this.statsJobs = data.result
    
    }).catch(err => {
      console.log(err)
    })
  }

  getAllUsers() {
    this.users.gettAllUsers().then((data: any) => {
      //formattedVal is define for return user roles values and join it with the bases of coma
      this.userData = data.result.items.map((r) => {
        let formattedVal = r.usersRoles.map((k) =>{return  k.roleId.name.replace(/\s/g, '').toLowerCase()}).join(',')
        return {
          ...r,
          usersRoles: formattedVal
        };
      });
  
  
     let recruiter = this.userData.map((recruiter)=>{
      if(recruiter.usersRoles.includes('recruiter')==true){
        return recruiter
      }
     
     })
  
     let accountManager = this.userData.map((recruiter)=>{
      if(recruiter.usersRoles.includes('accountmanager')==true){
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


  // onChange(options:string, isChecked: boolean) {
  //   const checkbox = this.checkBoxArray;
  //   let user = JSON.parse(localStorage.getItem('currentUser')).id

  //   if(isChecked) {
  //     let value = {
  //       questionId: options,
  //       created_by : user,
  //       updated_by:user
  //     }
  //     checkbox.push(value);


  //   } else {
  //     let value = checkbox.filter(i => {return (i == options)})

  //     const id = checkbox.indexOf(value.toString()); // 2
  //     const removed = checkbox.splice(id,  1);
  //   }


  //   this.checkbox =checkbox


  //   console.log("🚀 ~ file: add-job-opening.component.ts ~ line 111 ~ AddJobOpeningComponent ~ onChange ~ this.checkbox", this.checkbox)

  // }

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
    console.log("🚀 ~ file: job-edit.component.ts:163 ~ JobEditComponent ~ this.checkboxArray.map ~ this.checkboxArray", this.checkboxArray)


  }


  onChangeFactor(event) {
    let id = event.target.value;
    let checked = event.target.checked
    this.factorCheckboxArray.map((item) => {
      if (item.id == id) {
        item.selected = checked
        return item
      }
      return item
    })
    console.log("🚀 ~ file: job-edit.component.ts:163 ~ JobEditComponent ~ this.checkboxArray.map ~ this.factorCheckboxArray", this.factorCheckboxArray)


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

   

    onCurrency(event){
      console.log("🚀 ~ file: add-job-opening.component.ts:239 ~ AddJobOpeningComponent ~ onCurrency ~ value", event.target.value)
      this.currency = event.target.value
    }

    locationFunction(event){
      this.defaultLocation = event.target.value
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
      this.departmentList.gettAllDepartmentsIds().then((data: any) => {
        this.departList = data.result.items.filter((item)=>{
          if(this.currentRow.department === item.name){
            this.defaultDepartmentId = item.id
          }
          if(item.companyId===this.defaultCompanyId){
          return item
        }
        
      
      
      })
        let value = data.result.items.map((item)=>{if(item.companyId===this.defaultCompanyId){
          return item.location
        }})
        this.deptLocation = value.filter(i=>{return i !== undefined})
        console.log("🚀 ~ file: add-job-opening.component.ts:106 ~ AddJobOpeningComponent ~ this.departmentList.gettAllDepartments ~ this.departList", this.departList)
        console.log("🚀 ~ file: add-job-opening.comartList", this.deptLocation)
        console.log("🚀 ~ file: add-job-opening.comartList", this.defaultDepartmentId)
      
            }).catch(err => {
              console.log(err)
            })

    }).catch(err => {
      console.log(err)
    })
  }
  getAllQuestions() {
    this.questions.getAllQuestions().subscribe((data:any) => {
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

    

    })


  }


  getAllFactors() {
    this.questions.getAllFactorQuestions().subscribe((data:any) => {
      this.factorQuestionList = data.result.items


      this.allFactorQuestionList = this.jobsFactorQuestions.map((item) => {
        return {
          ...item.factorId,
          selected: false
        }
      })

      
      let comparison = (a, b) => a.id !== b.id
      let b = this.factorQuestionList.filter(b => this.allFactorQuestionList.every(a => comparison(a, b)));



      this.factorUnCheckBoxArray = b.map((item) => {
        return {
          ...item,
          selected: false,
        }
      })
      this.factorCheckboxArray = this.factorCheckBoxArray.concat(this.factorUnCheckBoxArray);
      console.log("🚀 ~ file: ons.getAllFactorQuestions ~ this.factorCheckboxArray:",  this.factorCheckboxArray )

    

    })


  }

  ReactiveUDFormOnSubmit() {
    this.ReactiveUDFormSubmitted = true;
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    //job realted questions 
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


    // factor related questions
    // this.factorCheckboxArray.map((newVal) => {
      
      
    //   this.jobsFactorQuestions.map((oldVal) => {
    //     if (newVal.id === oldVal.factorId.id) {
    //       let v = {
    //         id: oldVal.id,
    //         factorId: oldVal.factorId.id,
    //         created_by: user,
    //         updated_by: user
    //       }
    //       return this.finalFactorArray.push(oldVal)
    //     }


    //   })
    // })

    this.factorCheckboxArray.map((newVal) => {

      this.jobsFactorQuestions.map((roles) => {
        if (newVal.id == roles.factorId.id ) {
          console.log('', )
        }

      })
    })
    console.log("🚀 ~ file: job-edit.component.ts:477 ~ JobEditComponent ~ this.jobsQuestions.map ~ this.finalArray:", this.finalFactorArray)


    const filteredArray = this.factorCheckboxArray.filter(item2 =>
      this.jobsFactorQuestions.some(item1 => item1.factorId.id === item2.id && item2.selected)
    ).map((item)=>{
      let v ={
        id: item.id
      }
      this.finalFactorArray.push(v)
    })
    
    console.log('kkkkkkkkkkk',filteredArray);
    console.log("🚀 ~ file: job-edit.component.ts:477 ~ JobEditComponent ~ this.jobsQuestions.map ~ this.finalArray:", this.finalFactorArray)
    console.log("🚀 ~ file: job-edit.component.ts:477 ~ JobEditComponent ~ this.jobsQuestions.map ~ this.finalArray:", this.factorCheckboxArray)
    console.log("🚀 ~ file: job-edit.component.ts:477 ~ JobEditComponent ~ this.jobsQuestions.map ~ this.finalArray:", this.jobsFactorQuestions )



    // this.jobsFactorQuestions.map((oldVal)=>{
    //   this.factorCheckboxArray.map((newVal)=>{
    //     if(oldVal.factorId.id === newVal.id){
    //       return newVal
    //     }
    //   })
    // })



    // this.factorCheckboxArray.map((newVal) => {

    //   this.jobsFactorQuestions.filter((roles) => {
    //     if (roles.factorId.id == newVal.id  && newVal.selected !== false) {
    //       let v = {
    //         id: roles.id,
    //         factorId: roles.factorId.id,
    //         created_by: user,
    //         updated_by: user
    //       }
    //       return this.finalFactorArray.push(v)
    //     }


    //   })
    // })


    // const newArray = this.jobsFactorQuestions.filter(item1 => {
      
    //    this.factorCheckboxArray.some(item2 =>  {return item2.id==item1.factorId.id  })
      
    // });
    // console.log("🚀 ~ file: job-edit.component.ts:538 ~ JobEditComponent ~ newArray ~ newArray:", this.finalFactorArray)

    

    // this.finalFactorArray = this.factorCheckboxArray.map((item)=>{
    //   // debugger
    //   this.jobsFactorQuestions.filter((roles)=>(item.id === roles.factorId.id && item.selected === true))
    // })
    // console.log("🚀 ~ file: job-edit.componArray.map ~  this.finalFactorArray:",  this.finalFactorArray)



    // let comparisonFactor = (a, b) => a.id !== b.id
    // let secondArrayFactor = this.factorCheckboxArray.filter(b => this.allFactorQuestionList.every(a => comparisonFactor(a, b)));
    // let newRoleFactor = secondArrayFactor.map((item) => {
    //   if (item.selected !== false) {
    //     return {
    //       factorId: item.id,
    //       created_by: user,
    //       updated_by: user
    //     }
    //   }
    // })
    // let resultsFactor = this.finalFactorArray.concat(newRoleFactor);
    // const jobsFactorsQuestions = resultsFactor.filter(element => {
    //   return element !== undefined;
    // })




    let value = {
      title: this.ReactiveUserDetailsForm.value.jobtitle,
      companyName: this.companyId ||this.defaultCompanyId ,
      contactNumber: this.ReactiveUserDetailsForm.value.phoneNumber,
      email: this.ReactiveUserDetailsForm.value.email,
      accountManager: this.managerId || this.defaultManagerId,
      assignRecruiter:this.recruiterId || this.defaultRecruiterId ,
      dateOpened: '2022-09-09',
      jobStatus: this.ReactiveUserDetailsForm.value.jobStatus,
      jobType: this.ReactiveUserDetailsForm.value.jobType,
      workExperience: this.ReactiveUserDetailsForm.value.workExperience,
      department:this.departmentId || this.defaultDepartmentId,
      skillSet: this.ReactiveUserDetailsForm.value.skillset,
      salary: this.ReactiveUserDetailsForm.value.salary,
      location: this.defaultLocation || this.currentRow.location,
      country: 'pakistan',
      city: 'islamabad',
      logo: 'company.jpg',
      postalCode: '45000',
      noOfJobOpening: this.ReactiveUserDetailsForm.value.jobOpening,
      description: this.ReactiveUserDetailsForm.value.descriptions,
      created_by: user,
      updated_by: user,
      requirments: this.ReactiveUserDetailsForm.value.requirements,
      jobSummry: this.ReactiveUserDetailsForm.value.jobSummery,                                         
      isActive: false,
      jobsQuestions: jobRelatedQuestions || [],
      jobsFactorsQuestions: this.currentRow.jobsFactorQuestions || []

    }
    console.log("🚀 ~ file: job-edit.component.ts:647 ~ JobEditComponent ~ ReactiveUDFormOnSubmit ~ value:", value)

    this.jobs.editJob(value).then((dataResponse: any) => {     
      console.log("🚀 ~ file: add-job-opening.component.ts ~ line 172 ~ AddJobOpeningCompo       nent ~ this.jobs.addJob ~ dataResponse", dataResponse)
      alert('Job Updated Successfully')
      // window.location.reload()
      this.router.navigateByUrl(`careers/job-draft/${dataResponse.result.items.id}`)
      localStorage.setItem('jobId', JSON.stringify(dataResponse.result.items.id))
    },
      error => {
        alert(error.error.errors.code)                                                                                
      }
    ).catch((error) => {
      console.log('sddsfas', error)
      alert(error.message)
    })                   

    // this.router.navigateByUrl('careers/job-draft')
    // console.log(this.ReactiveUserDetailsForm.value);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.ReactiveUserDetailsForm.value));
 
 
  }

  ngOnInit(): void {
    this.getAllUsers()
    this.getAllCompanies()
    this.getAllQuestions()
    this.getAllJobs()
    this.getAllFactors()

    //get job by id 
    this.jobs.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      if (response.result.items.id) {
        this.currentRow = response.result.items;
        console.log("🚀 ~ file: job-edit.component.ts:519 ~ JobEditComponent ~ this.jobs.onUserListChanged.pipe ~ this.currentRow", this.currentRow)

        
        this.jobsQuestions = this.currentRow.jobsQuestions
        this.jobsFactorQuestions = this.currentRow.jobsFactorsQuestions

        
        this.checkBoxArray = this.jobsQuestions.map((item) => {
          return {
            ...item.questionId,
            selected: true,
            flag:item.flag
          }
        })

        this.factorCheckBoxArray = this.jobsFactorQuestions.map((item) => {
          return {
            ...item.factorId,
            selected: true
          }
        })
        console.log("🚀 ~ file: job-edit.component.ts:632 ~ JobEditComponent ~ this.jobs.onUserListChanged.pipe ~ this.jobsFactorQuestions:", this.factorCheckBoxArray)

        console.log("🚀 ~ file: company-edit.component.ts ~ line 123 ~ CompanyEditComponent ~ this._userEditService.onUserEditChanged.pipe ~ this.currentRow ", this.checkBoxArray)
      }
    })

   
    

    



    // Reactive form initialization
    this.ReactiveUserDetailsForm = this.formBuilder.group(
      {
        // userName: ['', Validators.required],
        jobtitle: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confPassword: ['', [Validators.required, Validators.minLength(6)]],
        country: ['', [Validators.required]],
        language: ['', [Validators.required]],
        // age: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        clientName: ['', [Validators.required]],
        jobOpening: ['', [Validators.required]],
        descriptions: ['', [Validators.required]],
        department: ['', [Validators.required]],
        requirements: ['', [Validators.required]],
        accountManager: ['', [Validators.required]],
        assignedRecruiter: ['', [Validators.required]],
        jobSummery: ['', [Validators.required]],
        jobType: ['', [Validators.required]],
        jobStatus: ['', [Validators.required]],
        workExperience: ['', [Validators.required]],
        salary: ['', [Validators.required]],
        skillset: ['', [Validators.required]],
        location: ['', [Validators.required]],
        city: ['', [Validators.required]],
        provence: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],

      },
      {
        validator: MustMatch('password', 'confPassword')
      }
    );
  }



  // Job Question Modal open
  modalOpenJobQuestion(jobQuestionModal) {
    this.selectedValue = ''
    this.modalService.open(jobQuestionModal, {
      centered: true,
      size: 'lg'
    });

   

 
}

chooseField(event){
  this.selectedValue = event.target.value;
}

close(){
  this.selectedValue = ''
}
  submitText(form){
    console.log("🚀 ~ file: add-new-question.component.ts:300 ~ AddNewQuestionComponent ~ submitText ~ form", form)
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    if(form.valid){
      let value ={
        type:'text',
        question:form.value.text,
        created_by : user,
        updated_by:user
      }
      this.questions.addQuestion(value).subscribe(addedQuestion => {
        this.questionList.push(addedQuestion.result.items); // Append the newly added question to the list of questions
        console.log("🚀 ~ file: add-job-stion ~ questionList:", this.questionList)
        this.getAllQuestions()
      });
      
    }
    else{
      alert('some thing went wrong please try again !')
    }
    
  }
  submitUpload(form){
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    if(form.valid){
      let value ={
        type:'upload',
        question:form.value.text,
        created_by : user,
        updated_by:user
      }
      this.questions.addQuestion(value).subscribe(addedQuestion => {
        this.questionList.push(addedQuestion.result.items); // Append the newly added question to the list of questions
        console.log("🚀 ~ file: add-job-stion ~ questionList:", this.questionList)
      });
      
    }
    else{
      alert('some thing went wrong please try again !')
    }
    
  }
  submitRadio(form){
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    if(form.valid){
      let value ={
        type:'radio',
        question:form.value.text,
        created_by : user,
        updated_by:user
      }
      this.questions.addQuestion(value).subscribe(addedQuestion => {
        this.questionList.push(addedQuestion.result.items); // Append the newly added question to the list of questions
        console.log("🚀 ~ file: add-job-stion ~ questionList:", this.questionList)
      });
      
    }
    else{
      alert('some thing went wrong please try again !')
    }
    
  }

  submitCheckbox(form){
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    if(form.valid){
      let value ={
        type:'checkbox',
        question:form.value.text,
        checkboxValues:this.multipleValues,
        created_by : user,
        updated_by:user
      }
      
      this.questions.addCheckboxQuestion(value).subscribe(addedQuestion => {
        this.questionList.push(addedQuestion.result.items); // Append the newly added question to the list of questions
        console.log("🚀 ~ file: add-job-stion ~ questionList:", this.questionList)
      });
      
    }
    else{
      alert('some thing went wrong please try again !')
    }
    
  }

  // Job factor Question Modal open
  modalOpenJobFactorQuestion(jobQuestionModal) {
    this.selectedValue = ''
    this.modalService.open(jobQuestionModal, {
      centered: true,
      size: 'lg'
    });
}


factorQuestionSubmit(){
  let user = JSON.parse(localStorage.getItem('currentUser')).id
      let value ={
        title:this.title,
        sampleQuestion:this.sampleQuestion,
        created_by : user,
        updated_by:user
      }
      this.questions.addFactorQuestion(value).subscribe(addedFactorQuestion => {
        this.factorQuestionList.push(addedFactorQuestion.result.items); // Append the newly added question to the list of questions
        alert(addedFactorQuestion.message)
        console.log("🚀 ~ file: add-job-stion ~ questionList:", this.factorQuestionList)
      });
      
    
      
}


}