import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'app/main/components/_helpers/must-match.validator';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DepartmentEditService } from 'app/main/setup/department-edit/department-edit.service';
import { CompanyEditService } from 'app/main/setup/company-edit/company-edit.service';
import { UserlistService } from '../joblisting/userlist.service';
import { UserEditService } from 'app/main/setup/user-edit/user-edit.service';
import { QuestionListService } from '../joblisting/question.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-job-opening',
  templateUrl: './add-job-opening.component.html',
  styleUrls: ['./add-job-opening.component.scss'],
   encapsulation: ViewEncapsulation.None,
})

export class AddJobOpeningComponent implements OnInit {
  public departList =[]
  public companiesList=[]
  public questionList=[]
  public checkbox;
  public factorCheckbox;
  public deptLocation=[]
  public checkBoxArray:any =[]
  public checkBoxArrayFactor:any =[]
  public userData:any=[]
  public recruiter:any=[]
  public requiredQuestion:any=[]
  public accountManager:any=[]
  public dataLength
  public state:Boolean=false
  public currrentRow: any={};
  public loginRecruter: any={};

  //factor question creation variable 
  public title:string
  public sampleQuestion:string

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
  public currency:string='$';
  public selectedValue: string;
  public questionFactorList=[]


  constructor(private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private departmentList: DepartmentEditService,
    private jobs: UserlistService,
    private users: UserEditService,
    private questions: QuestionListService,
    private companyList: CompanyEditService,
    ) {
      this._unsubscribeAll = new Subject();
    }
 
  // getter for easy access to form fields
  get ReactiveUDForm() {
    return this.ReactiveUserDetailsForm.controls;
  }

  
  // public
  public multipleValues = [{  value: '',  }];

  public item = {
    value: '',
  };

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



  selectDepartmentChangeHandler(event){
    console.log('jjjjjj', event.target.value )
  }

  selectClientChangeHandler(event){
    this.departmentList.gettAllDepartmentsIds().then((data: any) => {
      console.log("🚀 ~ file: add-job-opening.component.ts:104 ~ AddJobOpeningComponent ~ this.departmentList.gettAllDepartmentsIds ~ data:", data)
      this.departList = data.result.items.filter((item)=>(item.companyId===event.target.value))
      let value = data.result.items.map((item)=>{if(item.companyId===event.target.value){
        return item.location
      }})
      this.deptLocation = value.filter(i=>{return i !== undefined})
      console.log("🚀 ~ file: add-job-opening.component.ts:106 ~ AddJobOpeningComponent ~ this.departmentList.gettAllDepartments ~ this.departList", this.departList)
      console.log("🚀 ~ file: add-job-opening.comartList", this.deptLocation)
    
          }).catch(err => {
            console.log(err)
          })
  }

  selectAccountMangerChangeHandler(event){
    console.log('jjjjjj', event.target.value )
  }
  selectRecruiterChangeHandler(event){
    console.log('jjjjjj', event.target.value )
  }

  onJobType(event){
    console.log('jjjjjj', event.target.value )
  }

  // getAllDepartments() {
  //   this.departmentList.gettAllDepartmentsIds().then((data: any) => {

  //     this.departList = data.result.items
  //     console.log("🚀 ~ file: add-job-opening.component.ts:106 ~ AddJobOpeningComponent ~ this.departmentList.gettAllDepartments ~ this.departList", this.departList)
    
  //         }).catch(err => {
  //           console.log(err)
  //         })
  //     }

onChange(options:string, isChecked: boolean) {
  const checkbox = this.checkBoxArray;
  let user = JSON.parse(localStorage.getItem('currentUser')).id

  if(isChecked) {
    let value = {
      questionId: options,
      flag:false,
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
  console.log("🚀 ~ file: add-job-opening.component.ts:166 ~ AddJobOpeningComponent ~ onChange ~ checkbox:", checkbox)
}

onChangeRequried(data,id){
this.checkbox= this.checkbox.map((item)=>{
  if(item.questionId==data){
    item.flag = id
     return item
  }
  else{
    return item
  }
})

}

onChangeFactor(options:string, isChecked: boolean) {
  const checkbox = this.checkBoxArrayFactor
  let user = JSON.parse(localStorage.getItem('currentUser')).id

  if(isChecked) {
    let value = {
      factorId: options,
      created_by : user,
      updated_by:user
    }
    checkbox.push(value);
    
    
  } else {
    let value = checkbox.filter(i => {return (i == options)})
    
    const id = checkbox.indexOf(value.toString()); // 2
    const removed = checkbox.splice(id,  1);
  }

  
   this.factorCheckbox=checkbox
   console.log("🚀 ~ file: add-job-opening.component.ts:691 ~ AddJobOpeningComponent ~ onChangeFactor ~ this.factorCheckbox:", this.factorCheckbox)
}






getAllCompanies() {
  this.companyList.getCompanyInformation().then((data: any) => {
    this.companiesList = data.result.items
    console.log("🚀 ~ file: company-edit.component.ts ~ line 93 ~ CompanyEditComponent ~ this._tenantList.tenantList ~ this.tenantList", this.departList)
  
  }).catch(err => {
    console.log(err)
  })
}
getAllQuestions() {
   //get job by id 
   this.questions.getAllQuestions().subscribe((data:any) => {
    if(data.result.items){
     this.questionList = data.result.items
     this.dataLength = this.questionList.length;
     console.log("🚀 ~ file: add-job-opening.component.ts:156 ~ AddJobOpeningComponent ~ this.jobs.gettAllQuestions ~ this.dataLength", this.dataLength)
     
     console.log("🚀 ~ file: company-edit.component.ts ~ line 93 ~ CompanyEditComponent ~ this._tenantList.tenantList ~ this.tenantList", data)
   
    }
   })
}




getAllFactorQuestions() {
  //get job by id 
  this.questions.getAllFactorQuestions().subscribe((data:any) => {
   if(data.result.items){
    this.questionFactorList = data.result.items
    this.dataLength = this.questionList.length;
    console.log("🚀 ~ file: add-job-opening.component.ts:156 ~ AddJobOpeningComponent ~ this.jobs.gettAllQuestions ~ this.dataLength", this.dataLength)
    
    console.log("🚀 ~ file: company-edit.component.ts ~ line 93 ~ CompanyEditComponent ~ this._tenantList.tenantList ~ this.tenantList", data)
  
   }
  })
}




  

onCurrency(event){
  console.log("🚀 ~ file: add-job-opening.component.ts:239 ~ AddJobOpeningComponent ~ onCurrency ~ value", event.target.value)
  this.currency = event.target.value
}

getAllJobs() {
  this.jobs.gettAllJobs().then((data: any) => {
    this.currrentRow = data.result
    console.log("🚀 ~ tAllJobs ~ this.statsJobs", this.currrentRow)
  
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
        usersRoles: formattedVal,
      };
    });


   let recruiter = this.userData.map((recruiter)=>{
    if(recruiter.usersRoles.includes('recruiter')==true){

      if(JSON.parse(localStorage.getItem('currentUser')).is_staff===true){
        this.state=true
        return recruiter
       }
       else if(JSON.parse(localStorage.getItem('currentUser')).id===recruiter.id){
        
        return this.loginRecruter = {
         name:  recruiter.full_name,
         id:recruiter.id
        }
       }
    }
   
   })

   let accountManager = this.userData.map((accountManager)=>{
    if(accountManager.usersRoles.includes('accountmanager')==true){
      return accountManager
      // if(JSON.parse(localStorage.getItem('currentUser')).is_staff===true){
      //   return recruiter
      //  }
      //  else{
      //   recruiter.filter((item)=>(JSON.parse(localStorage.getItem('currentUser')).id===item.id))
      //   return recruiter
      //  }
    }
   
   })

   this.recruiter = recruiter.filter(i=> {return i !== undefined})
   
  
   this.accountManager = accountManager.filter(i=> {return i !== undefined})

   console.log("🚀 ~ file: add-job-opening.component.ts:178 ~ AddJobOpeningComponent ~ recruiter ~ recruiter", this.recruiter)

    console.log("🚀 ~ file: add-job-opening.component.ts:173 ~ AddJobOpeningComponent ~ this.userData=data.result.items.map ~ this.userData", this.userData)


  }).catch(err => {
    console.log(err)
  })
}



ReactiveUDFormOnSubmit() {
  this.ReactiveUDFormSubmitted = true;

  // stop here if form is invalid
  // if (this.ReactiveUserDetailsForm.invalid) {
  //   console.log("🚀 ~ file: add-job-opening.component.ts ~ line 70 ~ AddJobOpeningComponent ~ ReactiveUDFormOnSubmit ~ this.ReactiveUserDetailsForm", this.ReactiveUserDetailsForm)
  //   return;
  // }

  let user = JSON.parse(localStorage.getItem('currentUser')).id

  let value = {
    title :this.ReactiveUserDetailsForm.value.jobtitle,
    companyName :this.ReactiveUserDetailsForm.value.clientName,
    contactNumber:this.ReactiveUserDetailsForm.value.phoneNumber,
    email:this.ReactiveUserDetailsForm.value.email,
    accountManager:this.ReactiveUserDetailsForm.value.accountManager,
    assignRecruiter :this.ReactiveUserDetailsForm.value.assignedRecruiter,
    dateOpened:'2022-09-09',
    jobStatus :this.ReactiveUserDetailsForm.value.jobStatus,
    jobType :this.ReactiveUserDetailsForm.value.jobType, 
    workExperience :this.ReactiveUserDetailsForm.value.workExperience,
    department :this.ReactiveUserDetailsForm.value.department,  
    skillSet:this.ReactiveUserDetailsForm.value.skillset, 
    salary:this.ReactiveUserDetailsForm.value.salary,
    location:this.ReactiveUserDetailsForm.value.location,
    country:this.ReactiveUserDetailsForm.value.country,
    city:this.ReactiveUserDetailsForm.value.city,
    logo:'company.jpg', 
    postalCode:this.ReactiveUserDetailsForm.value.postalCode, 
    noOfJobOpening:this.ReactiveUserDetailsForm.value.jobOpening,
    description :this.ReactiveUserDetailsForm.value.descriptions,
    created_by : user,
    updated_by:user,
    requirments :this.ReactiveUserDetailsForm.value.requirements,
    jobSummry :this.ReactiveUserDetailsForm.value.jobSummery,
    isActive: false,
    jobsQuestions:this.checkbox || [],
    jobsFactorsQuestions:this.factorCheckbox || []
}
  this.jobs.addJob(value).then((dataResponse: any) => {  
    console.log("🚀 ~ file: add-job-opening.component.ts ~ line 172 ~ AddJobOpeningComponent ~ this.jobs.addJob ~ dataResponse", dataResponse)
    alert('Job Created Successfully')
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

  // this.router.navigateByUrl('careers/job-draft')
  // console.log(this.ReactiveUserDetailsForm.value);
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.ReactiveUserDetailsForm.value));
}

  ngOnInit(): void {
    this.getAllJobs()
    // this.getAllDepartments()
    this.getAllCompanies()
    this.getAllQuestions()
    this.getAllFactorQuestions()
    this.getAllUsers()

 

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
        descriptions:['', [Validators.required]],
        department:['', [Validators.required]],
        requirements:['', [Validators.required]],
        accountManager:['', [Validators.required]],
        assignedRecruiter:['', [Validators.required]],
        jobSummery:['', [Validators.required]],
        jobType:['', [Validators.required]],
        jobStatus:['', [Validators.required]],
        currency:['', [Validators.required]],
        workExperience:['', [Validators.required]],
        salary:['', [Validators.required]],
        skillset:['', [Validators.required]],
        location:['', [Validators.required]],
        city:['', [Validators.required]],
        provence:['', [Validators.required]],
        postalCode:['', [Validators.required]],

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
        this.questionFactorList.push(addedFactorQuestion.result.items); // Append the newly added question to the list of questions
        alert(addedFactorQuestion.message)
        console.log("🚀 ~ file: add-job-stion ~ questionList:", this.questionFactorList)
      });
      
    
      
}






}










