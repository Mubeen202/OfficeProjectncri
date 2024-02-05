import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import Stepper from 'bs-stepper';
import { DynamicFormFieldModel } from '../../dynamic-form-field-model';
import { QuestionModel } from '../../question-model';

import { CareersService } from 'app/main/careers/careers.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormWizardComponent implements OnInit {
  // public
  public contentHeader: object;
  public FirstName;
  public LastName;
  public LastOrganization;
  public PhoneNumber;
  public country;
  public language;
  public state;
  public zipcode;
  public email;
  public TDFirstNameVar;
  public TDLastNameVar;
  public twitterVar;
  public facebookVar;
  public googleVar;
  public linkedinVar;
  public landmarkVar;
  public expectedSalay;
  public currentSalary;
  public address;
  dynamicFormField! : DynamicFormFieldModel
  Questions2 ! : QuestionModel
  public jobQuestions : any = []
  public jobAnswers : any = []
  public area: {}
  public text:{}
  public file:string
  public radio:{}
  public checkbox:{}
  public checkBoxArray:any =[]
  public selectedList : {}
  public upload : {}



  public selectMulti = [{ name: 'English' }, { name: 'French' }, { name: 'Spanish' }];
  public selectMultiSelected;

  // private
  private horizontalWizardStepper: Stepper;
  private verticalWizardStepper: Stepper;
  private modernWizardStepper: Stepper;
  private modernVerticalWizardStepper: Stepper;
  private bsStepper;
 
  /**
   * Horizontal Wizard Stepper Next
   *
   * @param data
   */
  horizontalWizardStepperNext(data) {
    if (data.form.valid === true) {
      this.horizontalWizardStepper.next();
    }
  }

  horizontalWizardStepperNextWithoutData() {
    this.horizontalWizardStepper.next();
  }


  /**
   * Horizontal Wizard Stepper Previous
   */
  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous();
  }

  /**
   * Vertical Wizard Stepper Next
   */
  verticalWizardNext() {
    this.verticalWizardStepper.next();
  }
  /**
   * Vertical Wizard Stepper Previous
   */
  verticalWizardPrevious() {
    this.verticalWizardStepper.previous();
  }
  /**
   * Modern Horizontal Wizard Stepper Next
   */
  modernHorizontalNext() {
    this.modernWizardStepper.next();
  }
  /**
   * Modern Horizontal Wizard Stepper Previous
   */
  modernHorizontalPrevious() {
    this.modernWizardStepper.previous();
  }
  /**
   * Modern Vertical Wizard Stepper Next
   */
  modernVerticalNext() {
    this.modernVerticalWizardStepper.next();
  }
  /**
   * Modern Vertical Wizard Stepper Previous
   */
  modernVerticalPrevious() {
    this.modernVerticalWizardStepper.previous();
  }

  onText(event, question){
    this.text = {
      question: question.id,
      answerOfQues : event
    }
  }

  doSomething(question, event){
    let answer = event.target.value
   this.area = {
      question : question.id,
      answerOfQues:answer
    }
    
  }
  radioEvent(event, question){
    this.radio = {
      question: question.id,
      answerOfQues: event.target.value
    }
    
  }

  uploadFile(event, question){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);

    this.careerService.uploadFile(formData).then((response:any)=>{
      let Upload= response?.result?.items?.file
      this.upload={
        question: question.id,
        answerOfQues : Upload
      }
      alert(response.message)
    }).catch((error)=>
    {
      alert(error.message)
    })
    
  }
  


  onChange(options:string, isChecked: boolean, question) {
    const checkbox = this.checkBoxArray;
 
    if(isChecked) {
      checkbox.push(options);
      
    } else {
      let value = checkbox.filter(i => {return (i == options)})
      
      const id = checkbox.indexOf(value.toString()); // 2
      const removed = checkbox.splice(id,  1);
    }
    
    this.checkbox = {
      question: question.id,
      answerOfQues: checkbox.toString()
    }
  }

  handleSelectCountry(event){
    this.country = event.target.value
  }

  handleSelectLanguage(event){
    this.language = event.target.value
  }

 

  constructor(private router: Router, private careerService: CareersService) {}

  isEmpty(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
}

  /**
   * On Submit
   */
  
  onSubmit() {
    let answers:any=[]
    if(this.isEmpty(this.text==false)){
      answers.push(this.text)
    }
    if(this.isEmpty(this.area==false)){
      answers.push(this.area)
    }
    if(this.isEmpty(this.radio==false)){
      answers.push(this.radio)
    }
   
    if(this.isEmpty(this.upload==false)){
      answers.push(this.upload)
    }
    if(this.isEmpty(this.checkbox==false)){
      answers.push(this.checkbox)
    }
    var filteredAnswers = answers.filter(function (el) {
      return el != null || el != undefined;
    });
    let payload = {
      CareerJobs:localStorage.getItem('jobId'),
      firstName:this.FirstName,
      lastName:this.LastName,
      email:this.email,
      lastOrganization: this.LastOrganization,
      phoneNumber:this.PhoneNumber,
      address:this.address,
      state:this.state,
      zipCode:this.zipcode,
      country :this.country,
      language :this.language,
      currentSalary :this.currentSalary,
      expectedSalary:this.expectedSalay,
      uploadResume :"cv.jpg",
      answers:filteredAnswers
    }
    this.careerService.submitCandidateApplication(payload).then((response:any)=>{
      alert(response.message)
    }).catch((error)=>
    {
      alert(error.message)
    })
   
    this.router.navigate(['thankyou']);
    
    return false;
  }



  

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {
   this.refreshCareerList()
  this.dynamicFormField= {
  label:'Question ',
  type: 'textarea'
  }
  

  

    this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {});

    this.verticalWizardStepper = new Stepper(document.querySelector('#stepper2'), {
      linear: false,
      animation: true
    });

    this.modernWizardStepper = new Stepper(document.querySelector('#stepper3'), {
      linear: false,
      animation: true
    });

    this.modernVerticalWizardStepper = new Stepper(document.querySelector('#stepper4'), {
      linear: false,
      animation: true
    });

    this.bsStepper = document.querySelectorAll('.bs-stepper');

    // content header
    this.contentHeader = {
      headerTitle: 'Form Wizard',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Forms',
            isLink: true,
            link: '/'
          },
          {
            name: 'Form Wizard',
            isLink: false
          }
        ]
      }
    };
    
  }
  refreshCareerList() {
    this.careerService.getJobById(localStorage.getItem('jobId')).then((data: any) => {
      this.jobQuestions = data.result.items.questionsJob
    }).catch(err => {
      console.log(err)
    })

 

  }

 
}
