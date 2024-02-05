import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'app/main/components/_helpers/must-match.validator';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserlistService } from '../joblisting/userlist.service';
import { Router } from '@angular/router';
import { CandidatePoolService } from 'app/main/view-candidates/candidate-pool/candidate-pool.service';
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
// export class AddCandidateComponent implements OnInit {
//    public ReactiveUserDetailsForm: UntypedFormGroup;
//    public currrentRow: any={};
//   public ReactiveUDFormSubmitted = false;
//   public data: boolean;
//   public textArray: any = []
//   public jobQuestions: any = []
//   public jobAnswers: any = []
//   public area: {}
//   public text: {}
//   public questionObj: {}
//   public file: string
//   public textQuestion: string
//   public requiredQues: string
//   public radio: {}
//   public checkbox: {}
//   public radioButton: {}
//   public checkBoxArray: any = []
//   public radioArray: any = []
//   public selectedList: {}
//   public upload: {}

//   public uploader: FileUploader = new FileUploader({
//     isHTML5: true
//   });
//      public hasBaseDropZoneOver: boolean = false;

//      // private
//   private _unsubscribeAll: Subject<any>;
//   public jobsList: any=[];
//   public jobs: any=[];
//   public allCandidates: any=[];
//   public allowCandidates: any=[];
//   public allowCandidate: {}[];

//    //File Uploader Methods
//   // -----------------------------------------------------------------------------------------------------
//   fileOverBase(e: any): void {
//     this.hasBaseDropZoneOver = e;
//   }


//   // Reactive User Details form data
//   public UDForm = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confPassword: '',
//     age: '',
//     phoneNumber: '',
//     jobtitle: '',
//     lastOrg: '',
//     address: '',
//     state: '',
//     currentSalary:'',
//     expectedSalary:''
    
    
//   };

//  constructor(private router: Router,private formBuilder: UntypedFormBuilder, private _pricingService: UserlistService,
//   private careerService : CandidatePoolService) {
//   this._unsubscribeAll = new Subject();

//  }

//    // getter for easy access to form fields
//   get ReactiveUDForm() {
//     return this.ReactiveUserDetailsForm.controls;
//   }

//   onText(event, question,) {

//     let defaultValue = this.textArray.map(i => {this.textArray
//       if(i.question == question.questionId.id){
//         return i.question
//       } })
//       defaultValue = defaultValue.filter(function (el) {
//         return el != null || el != undefined;
//       });

//       if(defaultValue==question.questionId.id){
//         // debugger
//         this.textArray = this.textArray.map((item)=>{
//         if(defaultValue==item.question)
//         { 
//            return{
//             ...item,
//             answerOfQues: event
//           }
//         }
//         return item
//         })
//       }
//       else{


//     this.text = {
//       question: question.questionId.id,
//       answerOfQues: event
//     }
//     this.textArray.push(this.text)
//   }
//   }

//   textareaChange(question, event) {
//     let answer = event.target.value
//     this.area = {
//       question: question.id,
//       answerOfQues: answer
//     }
//     console.log("🚀 ~ file: form-wizard.component.ts:135 ~ FormWizardComponent ~ doSomething ~ question, event", this.area)


//   }


//   uploadFile(event, question) {
//     console.log("🚀 ~ file: form-wizard.component.ts:153 ~ FormWizardComponent ~ uploadFile ~ event, question", event, question)
//     var file = event.target.files[0];
//     const formData: FormData = new FormData();
//     formData.append('file', file, file.name);

//     this.careerService.uploadFile(formData).then((response: any) => {
//       let Upload = response?.result?.items?.file
//       this.upload = {
//         question: question.questionId.id,
//         answerOfQues: Upload
//       }
//       alert(response.message)
//     }).catch((error) => {
//       alert(error.message)
//     })

//   }
//   radioEvent(options, question, isChecked: boolean) {
//     let checkbox = this.radioArray;
    
//     if (isChecked) {
//       let defaultValue = checkbox.map(i => {
//           if(i.question == question.questionId.id){
//             return i.question
//           } })
//       defaultValue = defaultValue.filter(function (el) {
//         return el != null || el != undefined;
//       });
//       if(defaultValue==question.questionId.id){
//         // debugger
//         checkbox = checkbox.map((item)=>{
//         if(defaultValue==item.question)
//         { 
//            return{
//             ...item,
//             answerOfQues: options
//           }
//         }
//         return item
//         })
//       }
//       else{
//         checkbox.push({
//           question: question.questionId.id,
//           answerOfQues: options.toString()
//         })
//       }
//     }
//   }

//   getAllJobs() {
//     this._pricingService.getAllCandidates().then((data: any) => {
//       this.allCandidates= data.result.items

      
//       }).catch(err => {
//         console.log(err)
//       })
//       console.log("🚀 ~ file: add-candidate.component.ts:291 ~ AddCandidateComponent ~ this._pricingService.getAllCandidates ~  this.allCandidates",  this.allCandidates)


  
    
// }

// selectJobChangeHandler(event){
//   console.log('this is value', event.target.value)
//   // this.jobId = event.target.value;
//   // this._pricingService.getJobById(event.target.value).then((response:any) => {
//   //     if(response.result.items.jobsQuestions && response.result.items.jobsQuestions.length>0 ){
//   //       this.data= true
//   //       this.currentRow = response.result.items.jobsQuestions

//   //     }
//   //     else{
//   //       this.currentRow = response.result.items.jobsQuestions
//   //       this.data = false
//   //     }
//   //     console.log("🚀 ~ file: job-publish.component.ts:201 ~ JobPublishComponent ~ this._userListService.onCreatorJob.pipe ~ this.currrentRow ", this.currentRow )

    
  
//   //     });
// }
//   isEmpty(obj) {
//     for (var key in obj) {
//       if (obj[key] !== null && obj[key] != "")
//         return false;
//     }
//     return true;
//   }
//    ReactiveUDFormOnSubmit() {
//       let answers: any = []
//       if (this.isEmpty(this.textArray == false)) {
//         this.textArray.map((item)=>{
//           answers.push(item)
//         })
//       }
//       if (this.isEmpty(this.area == false)) {
//         answers.push(this.area)
//       }
//       if (this.isEmpty(this.radioArray == false)) {
//         this.radioArray.map((item)=>{
//           answers.push(item)
//         })
        
//       }
  
//       if (this.isEmpty(this.upload == false)) {
//         answers.push(this.upload)
//       }
//       if (this.isEmpty(this.checkbox == false)) {
//         answers.push(this.checkbox)
//       }
//       var filteredAnswers = answers.filter(function (el) {
//         return el != null || el != undefined;
//       });
  
//       let payload = {
//         careerJobs: JSON.parse(localStorage.getItem('jobId')),
//         firstName: this.ReactiveUserDetailsForm.value.firstName,
//         lastName: this.ReactiveUserDetailsForm.value.lastName,
//         email: this.ReactiveUserDetailsForm.value.email,
//         lastOrganization: this.ReactiveUserDetailsForm.value.lastOrg,
//         phoneNumber: this.ReactiveUserDetailsForm.value.phoneNumber,
//         address: this.ReactiveUserDetailsForm.value.address,
//         state: this.ReactiveUserDetailsForm.value.state,
//         zipCode: this.ReactiveUserDetailsForm.value.zipCode,
//         country: this.ReactiveUserDetailsForm.value.country,
//         language: this.ReactiveUserDetailsForm.value.language,
//         currentSalary: this.ReactiveUserDetailsForm.value.currentSalary,
//         expectedSalary: this.ReactiveUserDetailsForm.value.expectedSalary,
//         uploadResume: "cv.jpg",
//         answers: filteredAnswers
//       }
//       console.log("🚀 ~ file: add-candidate.component.ts:233 ~ AddCandidateComponent ~ ReactiveUDFormOnSubmit ~ payload", payload)
  
//       this.careerService.candidateLinkToJob(payload).then((response:any)=>{
//         alert(response.message)
//         this.router.navigateByUrl(`careers/job-publish/${JSON.parse(localStorage.getItem('jobId'))}`);
//       },
//        error=>{
//         alert(error.message)
  
//       }).catch((error)=>
//       {
//         alert(error.message)
//       })
  
      
  
//       return false;
//     }

//   ngOnInit(): void {
//     this.getAllJobs()
    
      
//     this._pricingService.onCreatorJob.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
//       if(response.result.items.jobsQuestions && response.result.items.jobsQuestions.length>0 ){
//         this.data= true
//         this.currrentRow = response.result.items.jobsQuestions
     
//       }
//       else{
//         this.currrentRow = response.result.items.jobsQuestions
//         this.data = false
//       }

    
  
//       });
//      // Reactive form initialization
//     this.ReactiveUserDetailsForm = this.formBuilder.group(
//       {
//         userName: ['', Validators.required],
//         jobtitle: ['', Validators.required],
//         firstName: ['', Validators.required],
//         lastName: ['', Validators.required],
//         email: ['', [Validators.required, Validators.email]],
//         password: ['', [Validators.required, Validators.minLength(6)]],
//         confPassword: ['', [Validators.required, Validators.minLength(6)]],
//         country: ['', [Validators.required]],
//         language: ['', [Validators.required]],
//         expectedSalary: ['', [Validators.required]],
//         currentSalary: ['', [Validators.required]],
//         age: ['', [Validators.required]],
//         phoneNumber: ['', [Validators.required]],
//         clientName: ['', [Validators.required]],
//         department:['', [Validators.required]],
//         accountManager:['', [Validators.required]],
//         assignedRecruiter:['', [Validators.required]],
//         jobType:['', [Validators.required]],
//         jobStatus:['', [Validators.required]],
//         workExperience:['', [Validators.required]],
//         salary:['', [Validators.required]],
//         skillset:['', [Validators.required]],
//         location:['', [Validators.required]],
//         city:['', [Validators.required]],
//         provence:['', [Validators.required]],
//         zipCode:['', [Validators.required]],
//         lastOrg:['', [Validators.required]],
//         address:['', [Validators.required]],
//         state:['', [Validators.required]],

//       },
//       {
//         validator: MustMatch('password', 'confPassword')
//       }
//     );
//   }

// }

export class AddCandidateComponent implements OnInit {
  public ReactiveUserDetailsForm: UntypedFormGroup;
  public currentRow: any={};
 public ReactiveUDFormSubmitted = false;
 public data: boolean;
 public textArray: any = []
 public jobQuestions: any = []
 public jobAnswers: any = []
 public jobsList: any = []
 public canidatesList: any = []
 public jobCandidates: any = []
 public area: {}
 public text: {}
 public jobId:string
 public candidateId:string
 public questionObj: {}
 public file: string
 public textQuestion: string
 public requiredQues: string
 public radio: {}
 public checkbox: {}
 public radioButton: {}
 public checkBoxArray: any = []
 public currrentRow: any = {}
 public radioArray: any = []
 public selectedList: {}
 public upload: {}

 public uploader: FileUploader = new FileUploader({
   isHTML5: true
 });
    public hasBaseDropZoneOver: boolean = false;

    // private
 private _unsubscribeAll: Subject<any>;

  //File Uploader Methods
 // -----------------------------------------------------------------------------------------------------
 fileOverBase(e: any): void {
   this.hasBaseDropZoneOver = e;
 }


 // Reactive User Details form data
 public UDForm = {
   firstName: '',
   lastName: '',
   email: '',
   password: '',
   confPassword: '',
   age: '',
   phoneNumber: '',
   jobtitle: '',
   lastOrg: '',
   address: '',
   state: '',
   currentSalary:'',
   expectedSalary:''
   
   
 };

constructor(private router: Router,private formBuilder: UntypedFormBuilder, private _pricingService: UserlistService,
 private careerService : CandidatePoolService) {
 this._unsubscribeAll = new Subject();

}

  // getter for easy access to form fields
 get ReactiveUDForm() {
   return this.ReactiveUserDetailsForm.controls;
 }

 onText(event, question,) {

   let defaultValue = this.textArray.map(i => {this.textArray
     if(i.question == question.questionId.id){
       return i.question
     } })
     defaultValue = defaultValue.filter(function (el) {
       return el != null || el != undefined;
     });

     if(defaultValue==question.questionId.id){
       // debugger
       this.textArray = this.textArray.map((item)=>{
       if(defaultValue==item.question)
       { 
          return{
           ...item,
           answerOfQues: event
         }
       }
       return item
       })
     }
     else{


   this.text = {
     question: question.questionId.id,
     answerOfQues: event
   }
   this.textArray.push(this.text)
 }
 }

 textareaChange(question, event) {
   let answer = event.target.value
   this.area = {
     question: question.id,
     answerOfQues: answer
   }
   console.log("🚀 ~ file: form-wizard.component.ts:135 ~ FormWizardComponent ~ doSomething ~ question, event", this.area)


 }


 uploadFile(event, question) {
   console.log("🚀 ~ file: form-wizard.component.ts:153 ~ FormWizardComponent ~ uploadFile ~ event, question", event, question)
   var file = event.target.files[0];
   const formData: FormData = new FormData();
   formData.append('file', file, file.name);

   this.careerService.uploadFile(formData).then((response: any) => {
     let Upload = response?.result?.items?.file
     this.upload = {
       question: question.questionId.id,
       answerOfQues: Upload
     }
     alert(response.message)
   }).catch((error) => {
     alert(error.message)
   })

 }
 radioEvent(options, question, isChecked: boolean) {
   let checkbox = this.radioArray;
   
   if (isChecked) {
     let defaultValue = checkbox.map(i => {
         if(i.question == question.questionId.id){
           return i.question
         } })
     defaultValue = defaultValue.filter(function (el) {
       return el != null || el != undefined;
     });
     if(defaultValue==question.questionId.id){
       // debugger
       checkbox = checkbox.map((item)=>{
       if(defaultValue==item.question)
       { 
          return{
           ...item,
           answerOfQues: options
         }
       }
       return item
       })
     }
     else{
       checkbox.push({
         question: question.questionId.id,
         answerOfQues: options.toString()
       })
     }
   }
 }
 



 selectCandidateChangeHandler(event){
   this.candidateId = event.target.value;
   console.log("🚀 ~ file: link-candidate.component.ts:207 ~ LinkCandidateToJob ~ selectCandidateChangeHandler ~ this.candidateId", this.candidateId)
   
 }

 isEmpty(obj) {
   for (var key in obj) {
     if (obj[key] !== null && obj[key] != "")
       return false;
   }
   return true;
 }



getAllCandidates() {
  let value = JSON.parse(localStorage.getItem('jobId'))
  this._pricingService.getJobById(value).then((response: any) => {
    this.jobCandidates = response.result.items.candidateApplyToThisJob.map((item)=>{ return item.canidateId})
    if(response.result.items.jobsQuestions && response.result.items.jobsQuestions.length>0 ){
      this.data= true
      this.currentRow = response.result.items.jobsQuestions
    }
    else{
      this.currentRow = response.result.items.jobsQuestions
      this.data = false
    }
   
    this._pricingService.getAllCandidates().then((data: any) => {
      let candidateData = data.result.items
      let comparison = (a, b) => a.id !== b.id
      this.canidatesList = candidateData.filter(b => this.jobCandidates.every(a => comparison(a, b)));
    
   
    
    }).catch(err => {
      console.log(err)
    })
    
    
  }).catch(err=>{
    console.log(err)
  })
  
 
}
ReactiveUDFormOnSubmit() {
let jobId = JSON.parse(localStorage.getItem('jobId'))

 let answers: any = []
 if (this.isEmpty(this.textArray == false)) {
   this.textArray.map((item)=>{
     answers.push(item)
   })
 }
 if (this.isEmpty(this.area == false)) {
   answers.push(this.area)
 }
 if (this.isEmpty(this.radioArray == false)) {
   this.radioArray.map((item)=>{
     answers.push(item)
   })
   
 }

 if (this.isEmpty(this.upload == false)) {
   answers.push(this.upload)
 }
 if (this.isEmpty(this.checkbox == false)) {
   answers.push(this.checkbox)
 }
 var filteredAnswers = answers.filter(function (el) {
   return el != null || el != undefined;
 });



 let value = {
   careerJob: jobId,
   canidateId:this.candidateId,
   answers: filteredAnswers
   } 

 this.careerService.candidateLinkToJob(value).then((response:any)=>{

   
   

   alert(response.message)
   this.router.navigateByUrl(`careers/job-publish/${response.result.items.id}`);
 },
   error=>{
   alert(error.message)

 }).catch((error)=>
 {
   alert(error.message)
 })

 

 return false;
}

 ngOnInit(): void {
  //  this._pricingService.onCreatorJob.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
   
  // })
  this.getAllCandidates()

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
       expectedSalary: ['', [Validators.required]],
       currentSalary: ['', [Validators.required]],
       age: ['', [Validators.required]],
       phoneNumber: ['', [Validators.required]],
       clientName: ['', [Validators.required]],
       department:['', [Validators.required]],
       accountManager:['', [Validators.required]],
       assignedRecruiter:['', [Validators.required]],
       jobType:['', [Validators.required]],
       jobStatus:['', [Validators.required]],
       workExperience:['', [Validators.required]],
       salary:['', [Validators.required]],
       skillset:['', [Validators.required]],
       location:['', [Validators.required]],
       city:['', [Validators.required]],
       provence:['', [Validators.required]],
       zipCode:['', [Validators.required]],
       lastOrg:['', [Validators.required]],
       address:['', [Validators.required]],
       state:['', [Validators.required]],

     },
     {
       validator: MustMatch('password', 'confPassword')
     }
   );
 }

}
