import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'app/main/components/_helpers/must-match.validator';
import { takeUntil } from 'rxjs/operators';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserlistService } from '../joblisting/userlist.service';
import { DepartmentEditService } from 'app/main/setup/department-edit/department-edit.service';
import { CompanyEditService } from 'app/main/setup/company-edit/company-edit.service';
import { UserEditService } from 'app/main/setup/user-edit/user-edit.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-draft',
  templateUrl: './job-draft.component.html',
  styleUrls: ['./job-draft.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobDraftComponent implements OnInit {
  public currentRow;
  public questionList;
  public urlLastValue;
  public url = this.router.url;
  public companiesList;
  public departList
  public defaultCompanyId
  public companyId;
  public departmentId;
  public defaultDepartmentId;
  private _unsubscribeAll: Subject<any>;
  public userData
  public defaultManagerId
  public defaultRecruiterId
  public manager
  public recruiter

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
    
    
  };
  statsJobs: any;
  public firstLetter: string;
  public secondLetter: string;

constructor(private formBuilder: UntypedFormBuilder,
  private _userEditService: UserlistService,
  private _toastrService: ToastrService,
  private users: UserEditService,
  private departmentList: DepartmentEditService,
  private companyList: CompanyEditService,
   private router: Router) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);

   }
   // getter for easy access to form fields
  get ReactiveUDForm() {
    return this.ReactiveUserDetailsForm.controls;
  }

  onEditChange(value){
  localStorage.setItem('jobId', JSON.stringify(value))
  this.router.navigateByUrl(`careers/job-edit/${value}`)
  }

  toastrProgressBar() {
    setTimeout(() => {
      this._toastrService.success(
        'You have successfully logged in as an user to Vuexy. Now you can start to explore. Enjoy! 🎉',
        '👋 Welcome, ',
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    }, 2500);
  }

   ReactiveUDFormOnSubmit() {

    this._toastrService.success('👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.', 'Success!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
    let user = JSON.parse(localStorage.getItem('currentUser')).id

    this.ReactiveUDFormSubmitted = true;
    if(this.ReactiveUserDetailsForm.value.department!==null && this.ReactiveUserDetailsForm.value.clientName!==null 
      && this.currentRow.requirements !==''  && this.currentRow.descriptions !=='' 
      && this.currentRow.jobSummry !=='' &&
      this.ReactiveUserDetailsForm.value.assignedRecruiter!==null && this.ReactiveUserDetailsForm.value.accountManager!==null)
      {
        let value = {
      title: this.ReactiveUserDetailsForm.value.jobtitle,
      companyName: this.companyId ||this.defaultCompanyId ,
      contactNumber: this.ReactiveUserDetailsForm.value.phoneNumber,
      email: this.ReactiveUserDetailsForm.value.email,
      // accountManager: '',
      // assignRecruiter:'' ,
      dateOpened: '2022-09-09',
      job_status: this.ReactiveUserDetailsForm.value.jobStatus,
      jobType: this.ReactiveUserDetailsForm.value.jobType,
      workExperience: this.ReactiveUserDetailsForm.value.workExperience,
      department:this.departmentId || this.defaultDepartmentId,
      skillSet: this.ReactiveUserDetailsForm.value.skillset,
      salary: this.ReactiveUserDetailsForm.value.salary,
      location: this.ReactiveUserDetailsForm.value.location,
      country: this.ReactiveUserDetailsForm.value.country,
      city: this.ReactiveUserDetailsForm.value.city,
      logo: 'company.jpg',
      postalCode: this.ReactiveUserDetailsForm.value.postalCode,
      noOfJobOpening: this.ReactiveUserDetailsForm.value.jobOpening,
      description: this.ReactiveUserDetailsForm.value.descriptions,
      created_by: user,
      updated_by: user,
      requirments: this.ReactiveUserDetailsForm.value.requirements,
      jobSummry: this.ReactiveUserDetailsForm.value.jobSummery,
      draft:false,
      jobsQuestions: this.currentRow.jobsQuestions,
      jobsFactorsQuestions: this.currentRow.jobsFactorsQuestions
    }
    console.log("🚀 ~ file: job-draft.component.ts:105 ~ JobDraftComponent ~ ReactiveUDFormOnSubmit ~ this.ReactiveUserDetailsForm.value.jobSummery", value)

    this._userEditService.publishJob(value).then((dataResponse: any) => {  
      console.log("🚀 ~ file: add-job-opening.component.ts ~ line 172 ~ AddJobOpeningComponent ~ this.jobs.addJob ~ dataResponse", dataResponse)
      
      this.router.navigateByUrl('careers/joblisting')
    },
    error=>{
      alert("Please fill all Fields and then publish job")
    }
    ).catch((error) => {
      console.log('sddsfas', error)
      alert(error.message)
    })

    

      }
      else{
        alert("Please fill all Fields and then publish job")
      }
    
    // let value = {
    //   title: this.ReactiveUserDetailsForm.value.jobtitle,
    //   companyName: this.companyId ||this.defaultCompanyId ,
    //   contactNumber: this.ReactiveUserDetailsForm.value.phoneNumber,
    //   email: this.ReactiveUserDetailsForm.value.email,
    //   accountManager: this.ReactiveUserDetailsForm.value.accountManager,
    //   assignRecruiter:this.ReactiveUserDetailsForm.value.assignedRecruiter ,
    //   dateOpened: '2022-09-09',
    //   jobStatus: this.ReactiveUserDetailsForm.value.jobStatus,
    //   jobType: this.ReactiveUserDetailsForm.value.jobType,
    //   workExperience: this.ReactiveUserDetailsForm.value.workExperience,
    //   department:this.departmentId || this.defaultDepartmentId,
    //   skillSet: this.ReactiveUserDetailsForm.value.skillset,
    //   salary: this.ReactiveUserDetailsForm.value.salary,
    //   location: this.ReactiveUserDetailsForm.value.location,
    //   country: this.ReactiveUserDetailsForm.value.country,
    //   city: this.ReactiveUserDetailsForm.value.city,
    //   logo: 'company.jpg',
    //   postalCode: this.ReactiveUserDetailsForm.value.postalCode,
    //   noOfJobOpening: this.ReactiveUserDetailsForm.value.jobOpening,
    //   description: this.ReactiveUserDetailsForm.value.descriptions,
    //   created_by: user,
    //   updated_by: user,
    //   requirments: this.ReactiveUserDetailsForm.value.requirements,
    //   jobSummry: this.ReactiveUserDetailsForm.value.jobSummery,
    //   isActive: false,
    //   jobsQuestions: []
    // }
    // console.log("🚀 ~ file: job-draft.component.ts:91 ~ JobDraftComponent ~ ReactiveUDFormOnSubmit ~ this.ReactiveUDFormSubmitted", this.ReactiveUserDetailsForm.value)
    // this._userEditService.publishJob().then((dataResponse: any) => {  
    //   console.log("🚀 ~ file: add-job-opening.component.ts ~ line 172 ~ AddJobOpeningComponent ~ this.jobs.addJob ~ dataResponse", dataResponse)
    //   alert('Job Published Successfully')
    //   this.router.navigateByUrl('careers/joblisting')
    // },
    // error=>{
    //   alert(error.error.errors.code)
    // }
    // ).catch((error) => {
    //   console.log('sddsfas', error)
    //   alert(error.message)
    // })

    // stop here if form is invalid
    // if (this.ReactiveUserDetailsForm.invalid) {
    
    //   this.router.navigateByUrl('careers/job-publish')
    //   return;
    // }
  }

  
  companySelected(event){
    this.companyId = event
   }

   departmentSelected(event){
    this.departmentId = event
   }

  getAllDepartments() {
    this.departmentList.gettAllDepartments().then((data: any) => {
      this.departList = data.result.items
      this.departList.map((item)=>{
        if(item.name=== this.currentRow.department){
          this.defaultDepartmentId = item.id
        }
        
      })
    }).catch(err => {
      console.log(err)
    })
}



getAllCompanies() {
  this.companyList.getCompanyInformation().then((data: any) => {
    this.companiesList = data.result.items
    this.companiesList.map((item)=>{
      if(item.name=== this.currentRow.companyName){
        this.defaultCompanyId = item.id
      }
      
    })
  
  }).catch(err => {
    console.log(err)
  })
}


getAllJobs() {
  this._userEditService.gettAllJobs().then((data: any) => {
    this.statsJobs = data.result
    
    
  
  }).catch(err => {
    console.log(err)
  })
}

  ngOnInit(): void {
    this.getAllCompanies()
    this.getAllDepartments()
    this.getAllJobs()
    //get job by id 
    this._userEditService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      if(response.result.items.id == this.urlLastValue){
        this.currentRow = response.result.items;
        
        const words = this.currentRow.accountManager.split(" "); // split the string into an array of words
        const firstLetters = words.map(word => word[0]); // create a new array with the first letter of each word
        const [firstLetterOfWord1, firstLetterOfWord2] = firstLetters; // assign the first letter of each word to a separate variable
        
        this.firstLetter = firstLetterOfWord1// "H"
        this.secondLetter = firstLetterOfWord2 // "W"
       
        this.questionList = this.currentRow.jobsQuestions

        console.log("🚀 ~ file: company-edit.component.ts ~ line 123 ~ CompanyEditComponent ~ this._userEditService.onUserEditChanged.pipe ~ this.currentRow ", this.currentRow )
        console.log("🚀 ~ file: company-edit.component.ts ~ line 123 ~ CompanyEditComponent ~ this._userEditService.onUserEditChanged.pipe ~ this.currentRow ", this.questionList )
      }
    
      
   
      // this.rows.map(row => {
      //   if (row.id == this.urlLastValue) {
      //     this.currentRow = row;
      //     // this.avatarImage = this.currentRow.avatar;
      //     this.tempRow = cloneDeep(row);
      //   }
      // });
    });

     // Reactive form initialization
    this.ReactiveUserDetailsForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        jobtitle: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confPassword: ['', [Validators.required, Validators.minLength(6)]],
        country: ['', [Validators.required]],
        language: ['', [Validators.required]],
        age: ['', [Validators.required]],
        jobOpening: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        description:['', [Validators.required]],
        requirements:['', [Validators.required]],
        clientName: ['', [Validators.required]],
        department:['', [Validators.required]],
        accountManager:['', [Validators.required]],
        assignedRecruiter:['', [Validators.required]],
        jobType:['', [Validators.required]],
        jobStatus:['', [Validators.required]],
        workExperience:['', [Validators.required]],
        salary:['', [Validators.required]],
        skillset:['', [Validators.required]],
        jobSummry:['', [Validators.required]],
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

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
