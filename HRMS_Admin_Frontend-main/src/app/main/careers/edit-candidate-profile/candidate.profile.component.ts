import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from './date-time-picker.snippetcode';
import { ProfileService } from 'app/main/view-candidates/profile/profile.service';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { I18n, CustomDatepickerI18n } from '../date-picker-i18n/date-picker-i18n.service';
import { CandidatePoolService } from 'app/main/view-candidates/candidate-pool/candidate-pool.service';
@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate.profile.component.html',
  styleUrls: ['./candidate.profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }] // define custom NgbDatepickerI18n provider

})
export class CandidateProfileComponent implements OnInit {
  educationId: any;

  //reload pop up 
  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event: BeforeUnloadEvent) {
  //   // Display a confirmation popup
  //   event.returnValue = window.confirm('Are you sure you want to leave this page?');
  // }

  // @HostListener('window:beforeunload')
  // beforeUnload() {
  //   window.confirm('Are you sure you want to leave this page?');
  //   // do something before the user leaves the page or closes the tab
  // }

  // @HostListener('window:unload')
  // unload() {
  //   window.confirm('Are you sure you want to leave this page?');
  //   // do something when the user leaves the page or closes the tab
  // }


  @HostListener('window:beforeunload', ['$event'])
  confirmLeave(event: any) {
    // show confirmation message
    event.preventDefault(); // Cancel the event to prevent the browser from closing the tab
    event.returnValue = ''; // Chrome requires this line to work
  }
  //candidate object 
  public candidateData: any = {};
  public editEducationData: any = {};
  public editExperienceData: any = {};
  public editCertificationData: any = {};
  public educationData: any = [];
  public experienceData: any = [];
  public certificateData: any = [];
  public allOrganizations: any = [];




  // public
  public ReactiveUserDetailsForm: UntypedFormGroup;

  public contentHeader: object;
  public TDFirstNameVar;
  public TDProfessionalSummaryVar;
  public TDLastNameVar;
  public TDEmailVar;
  public TDLastOrganizationVar;
  public TDphoneNumberVar;
  public TDaddressVar;
  public TDstateVar;
  public TDzipCodeVar;
  public TDcountryVar;
  public TDcurrentSalaryVar;
  public TDexpectedSalaryVar;
  public TDlanguageVar;
  public _snippetCodeRangeSelectionDP = snippet.snippetCodeRangeSelectionDP;
  public currrentRow: []
  educationState: Boolean = false;

  public twitterVar;
  public facebookVar;
  public googleVar;
  public ReactiveUDFormSubmitted = false;
  public state: Boolean = true
  public linkedinVar;
  public landmarkVar;
  public addressVar;

  filePath: string;

  //**************Education************ */
  public i18nDPdata: NgbDateStruct;
  public educationType: string
  public institutionName: string
  public degreeName: string
  public toDate: NgbDateStruct
  public fromDate: NgbDateStruct
  public descriptions: string



  //**************Experience************ */
  public organization: string
  public position: string
  public TDFirsNameVar;
  // public certificateType: string
  public toDateExperience: NgbDateStruct
  public fromDateExperience: NgbDateStruct
  public descriptionsOfExperience: string
  public defaultOrganizationId: string
  


  //**************Certification************ */
  public certificateType: string
  public certificateName: string
  public toDateCertificate: NgbDateStruct
  public fromDateCertificate: NgbDateStruct
  public descriptionsOfCertification: string

  // public

  public avatarImage: string
  public imageState:Boolean = false
  public imageUploadUrl: string='';

  onFileSelect(files: FileList) {
    if (files.length > 0) {
      this.state = false
      this.filePath = files[0].name;

    }
  }


  public selectBasic = [
    { name: 'UK' },
    { name: 'USA' },
    { name: 'Spain' },
    { name: 'France' },
    { name: 'Italy' },
    { name: 'Australia' }
  ];

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

  public selectMulti = [{ name: 'English' }, { name: 'French' }, { name: 'Spanish' }];
  public selectMultiSelected;


  private modernVerticalWizardStepper: Stepper;
  gettingLanguage(event){
    this.TDlanguageVar = event
  }

  gettingCountry(event){
    this.TDcountryVar = event
  }



  addLeadingZero(num) {
    return num < 10 ? '0' + num : num;
  }
  accountDataFormNext(data) {
    if (data.form.valid === true) {
     
      const experienceArray = this.experienceData.map(experience => {
        const { id, ...rest } = experience;
        rest.toDate = `${rest.toDate.year}-${this.addLeadingZero(rest.toDate.month)}-${this.addLeadingZero(rest.toDate.day)}` 
        rest.fromDate = `${rest.fromDate.year}-${this.addLeadingZero(rest.fromDate.month)}-${this.addLeadingZero(rest.fromDate.day)}` 
  
        return rest;
      });
  
      const educationArray = this.educationData.map(education => {
        const { id, ...rest } = education;
        rest.toDate = `${rest.toDate.year}-${this.addLeadingZero(rest.toDate.month)}-${this.addLeadingZero(rest.toDate.day)}` 
        rest.fromDate = `${rest.fromDate.year}-${this.addLeadingZero(rest.fromDate.month)}-${this.addLeadingZero(rest.fromDate.day)}` 
  
        return rest;
      });
  
      const certificateArray = this.certificateData.map(certificate => {
        const { id, ...rest } = certificate;
        rest.toDate = `${rest.toDate.year}-${this.addLeadingZero(rest.toDate.month)}-${this.addLeadingZero(rest.toDate.day)}` 
        rest.fromDate = `${rest.fromDate.year}-${this.addLeadingZero(rest.fromDate.month)}-${this.addLeadingZero(rest.fromDate.day)}` 
  
        return rest;
      });

      let payload = {
        professionalSummary: data.value.professionalSummery !== undefined ? data.value.professionalSummery : '',
        firstName: data.value.firstName,
        lastName: data.value.lastName,
        email: data.value.email,
        lastOrganization: data.value.lastOrganization,
        phoneNumber: data.value.phoneNumber,
        address: data.value.address,
        state: data.value.state,
        zipCode: data.value.zipCode,
        country: this.TDcountryVar,
        language: this.TDlanguageVar,
        currentSalary: data.value.currentSalary,
        expectedSalary: data.value.expectedSalary,
        profileImage: this.imageUploadUrl ,
        candidateExperience:experienceArray,
        candidateCertificates: certificateArray,
        candidateEducation:educationArray
      }
 
      this._pricingService.createCandidate(payload).then((response:any)=>{
        alert(response.message)
        localStorage.setItem('candidateId', JSON.stringify(response.result.items.id))
        this.router.navigateByUrl(`view-candidates/profile/${response.result.items.id}`);

      },
       error=>{
        alert(error.message)
  
      }).catch((error)=>
      {
        alert(error.message)
      })
    }

  }

  

  private formatDate(date: string): NgbDateStruct {
    if (date) {
      const dateParts = date.trim().split('-');
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const day = parseInt(dateParts[2], 10);
        return { year, month, day };
      }
    }
    return null;
  }



  openNewEducationForm() {
    this.educationState = true
  }

  educationFormNext(data) {
    console.log("🚀 ~ file: candidate.profile.component.ts:138 ~ CandidateProfileComponent ~ educationFormNext ~ data:", data)
    this.modernVerticalWizardStepper.next();

  }


  certificationFormNext(data) {
    console.log("🚀 ~ file: candidate.profile.component.ts:138 ~ CandidateProfileComponent ~ educationFormNext ~ data:", data)
    this.modernVerticalWizardStepper.next();

  }

  experienceFormNext(data) {
    console.log("🚀 ~ file: candidate.profile.component.ts:138 ~ CandidateProfileComponent ~ educationFormNext ~ data:", data)
    this.modernVerticalWizardStepper.next();

  }
  // getter for easy access to form fields
  get ReactiveUDForm() {
    return this.ReactiveUserDetailsForm.controls;
  }
  /**
   * Modern Vertical Wizard Stepper Previous
   */
  modernVerticalPrevious() {
    this.modernVerticalWizardStepper.previous();
  }

  /**
   * On Submit
   */
  onSubmit() {
    alert('Submitted!!');
    return false;
  }

  ReactiveUDFormOnSubmit() {
    let payload = {
      firstName: this.ReactiveUserDetailsForm.value.firstName,
      lastName: this.ReactiveUserDetailsForm.value.lastName,
      email: this.ReactiveUserDetailsForm.value.email,
      lastOrganization: this.ReactiveUserDetailsForm.value.lastOrg,
      phoneNumber: this.ReactiveUserDetailsForm.value.phoneNumber,
      address: this.ReactiveUserDetailsForm.value.address,
      state: this.ReactiveUserDetailsForm.value.state,
      zipCode: this.ReactiveUserDetailsForm.value.zipCode,
      country: this.ReactiveUserDetailsForm.value.country,
      language: this.ReactiveUserDetailsForm.value.language,
      currentSalary: this.ReactiveUserDetailsForm.value.currentSalary,
      expectedSalary: this.ReactiveUserDetailsForm.value.expectedSalary,
      uploadResume: "cv.jpg",
    }
    console.log("🚀 ~ file: add-candidate.component.ts:233 ~ AddCandidateComponent ~ ReactiveUDFormOnSubmit ~ payload", payload)

    // this.careerService.createCandidate(payload).then((response:any)=>{
    //   alert(response.message)
    //   this.router.navigateByUrl(`view-candidates/candidate-pool`);
    // },
    //  error=>{
    //   alert(error.message)

    // }).catch((error)=>
    // {
    //   alert(error.message)
    // })



    return false;
  }

  value() {
    console.log('this is running', this.i18nDPdata)
  }

  constructor(private _pricingService: CandidatePoolService, 
    private router: Router, 
    private formBuilder: UntypedFormBuilder, public formatter: NgbDateParserFormatter,
    private modalService: NgbModal) { }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {

    this.modernVerticalWizardStepper = new Stepper(document.querySelector('#stepper4'), {
      linear: false,
      animation: true
    });

    // this.bsStepper = document.querySelectorAll('.bs-stepper');

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

  // Education
  modalOpenXL(modalXL, data) {
    if (data.form.valid === true) {
      this.institutionName = ''
      this.degreeName = ''
      this.educationType = ''
      this.toDate = { year: null, month: null, day: null };
      this.fromDate = { year: null, month: null, day: null };
      this.descriptions = ''
      this.modalService.open(modalXL, {
        centered: true,
        size: 'xl'
      });
    }
 
  }
  // EducationSubmit() {
  //   let payload = {
  //     id: uuidv4(),
  //     candidateId: JSON.parse(localStorage.getItem('candidateId')),
  //     institutionName: this.institutionName,
  //     degreeName: this.degreeName,
  //     descriptions: this.descriptions,
  //     educationType: this.educationType,
  //     toDate: `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`,
  //     fromDate: `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`
  //   }


  //   this._pricingService.candidateEducation(payload).then((response: any) => {
  //     alert(response.message)
  //     window.location.reload()
  //   },
  //     error => {
  //       alert(error.message)

  //     }).catch((error) => {
  //       alert(error.message)
  //     })
  // }
  EducationSubmit() {
    let payload = {
      id: uuidv4(),
      institutionName: this.institutionName,
      degreeName: this.degreeName,
      educationType: this.educationType,
      toDate: this.toDate,
      fromDate: this.fromDate,
      descriptions: this.descriptions,
    }
    this.educationData.push(payload)
  }

  editEducationRecord(editModalXL, data) {
    this.editEducationData = data
    this.modalService.open(editModalXL, {
      centered: true,
      size: 'xl'
    });

  }
  // editSaveEducationRecord(id) {
  //   let payload = {
  //     candidateId: JSON.parse(localStorage.getItem('candidateId')),
  //     institutionName: this.editEducationData.institutionName,
  //     degreeName: this.editEducationData.degreeName,
  //     descriptions: this.editEducationData.descriptions,
  //     educationType: this.editEducationData.educationType,
  //     toDate: `${this.editEducationData.toDate.year}-${this.editEducationData.toDate.month}-${this.editEducationData.toDate.day}`,
  //     fromDate: `${this.editEducationData.fromDate.year}-${this.editEducationData.fromDate.month}-${this.editEducationData.fromDate.day}`
  //   }

  //   this._pricingService.editcandidateEducation(id, payload).then((response: any) => {
  //     alert(response.message)
  //     window.location.reload()
  //     console.log("🚀 ~ file: candidate.profile.component.ts:354 ~ CandidatePngParameter ~ response:", response.result.items)
  //   },
  //     error => {
  //       alert(error.message)

  //     }).catch((error) => {
  //       alert(error.message)
  //     })
  // }

  editSaveEducationRecord(payload) {
    const index = this.educationData.findIndex(record => record.id === payload.id);
    if (index > -1) {
      this.educationData[index] = payload;
    }

  }
  // deleteEducationRecord(id) {
  //   console.log("🚀 ~ file: candidate.profile.component.ts:490 ~ CandidateProfileComponent ~ deleteEducationRecord ~ id:", id)
  //   this._pricingService.deleteCandidateEducationRecord(id).then((response: any) => {
  //     alert('Candidate Education Record Deleted Successfully')
  //     window.location.reload()
  //   },
  //     error => {
  //       alert(error.message)

  //     }).catch((error) => {
  //       alert(error.message)
  //     })


  // }

  deleteEducationRecordPopUp(deleteModalXL,id) {

    this.modalService.open(deleteModalXL, {
      centered: true,
      size: 'sm'
    });
    this.educationId = id 
   


  }
  deleteEducationRecord() {
    const index = this.educationData.findIndex(record => record.id === this.educationId);
    if (index > -1) {
      this.educationData.splice(index, 1);
    }
  }





  // Experience Modal open
  modalOpenExperience(modalXL, data) {
    if (data.form.valid === true) {
      this.organization = ''
      this.position = ''
      this.certificateType = ''
      this.toDateExperience = { year: null, month: null, day: null };
      this.fromDateExperience = { year: null, month: null, day: null };
      this.descriptionsOfExperience = ''
      this.modalService.open(modalXL, {
        centered: true,
        size: 'xl'
      });

    }
   
  }

  ExperienceSubmit(educationForm) {
  console.log("🚀 ~ file: candidate.profile.component.ts:617 ~ CandidateProfileComponent ~ ExperienceSubmit ~ educationForm:", educationForm)

    if (educationForm.form.valid === true) {
      let payload = {
        id: uuidv4(),
        descriptions: this.descriptionsOfExperience,
        position: this.position,
        organizationId: this.organization,
        toDate: this.toDateExperience,
        fromDate: this.fromDateExperience,
      }
      this.experienceData.push(payload)
    }
 
  }
  editExperienceRecord(editModalXL, data) {


    this.editExperienceData = data
    this.modalService.open(editModalXL, {
      centered: true,
      size: 'xl'
    });

  }
  editSaveExperienceRecord(payload) {
    const index = this.experienceData.findIndex(record => record.id === payload.id);
    console.log("🚀 ~ file: candidate.profile.component.ts:636 ~ CandidateProfileComponent ~ editSaveExperienceRecord ~ index:", index)

    if (index > -1) {
      this.experienceData[index] = payload;
    }

  }
  deleteExperienceRecord(id) {
    const index = this.experienceData.findIndex(record => record.id === id);
    if (index > -1) {
      this.experienceData.splice(index, 1);
    }
  }



  // Cerification
  modalOpenCertification(modalXL, data) {
    if (data.form.valid === true) {
      this.certificateType=''
      this.certificateName=''
      this.toDateCertificate= { year: null, month: null, day: null };
      this.fromDateCertificate= { year: null, month: null, day: null };
      this.descriptionsOfCertification=''
      this.modalService.open(modalXL, {
        centered: true,
        size: 'xl'
      });
    }
   
  }



  // CertificationSubmit() {
  //   let payload = {
  //     candidateId: JSON.parse(localStorage.getItem('candidateId')),
  //     descriptions: this.descriptionsOfCertification,
  //     certificateName: this.certificateName,
  //     certificateType: this.certificateType,
  //     toDate: `${this.toDateCertificate.year}-${this.toDateCertificate.month}-${this.toDateCertificate.day}`,
  //     fromDate: `${this.fromDateCertificate.year}-${this.fromDateCertificate.month}-${this.fromDateCertificate.day}`
  //   }

  //   console.log("🚀 ~ file: candidate.profile.component.ts:744 ~ CandidateProfileComponent ~ CertificationSubmit ~ payload:", payload)

  //   this._pricingService.candidateCertification(payload).then((response: any) => {
  //     alert(response.message)
  //     window.location.reload()
  //   },
  //     error => {
  //       alert(error.message)

  //     }).catch((error) => {
  //       alert(error.message)
  //     })
  // }
  CertificationSubmit() {
    let payload = {
      id: uuidv4(),
      descriptions: this.descriptionsOfCertification,
      certificateName: this.certificateName,
      certificateType: this.certificateType,
      toDate: this.toDateCertificate,
      fromDate: this.fromDateCertificate
    }

    this.certificateData.push(payload)
  }



  // editCertificationRecord(editModalXL, id) {
  //   this.modalService.open(editModalXL, {
  //     centered: true,
  //     size: 'xl'
  //   });
  //   this._pricingService.getCandidateCertificationData(id).then((response: any) => {
  //     this.editCertificationData = response

  //     this.editCertificationData.fromDate = this.formatDate(this.editCertificationData.fromDate)
  //     this.editCertificationData.toDate = this.formatDate(this.editCertificationData.toDate)

  //   },
  //     error => {
  //       alert(error.message)

  //     }).catch((error) => {
  //       alert(error.message)
  //     })

  // }
  editCertificationRecord(editModalXL, data) {
    this.editCertificationData = data
    this.modalService.open(editModalXL, {
      centered: true,
      size: 'xl'
    });

  }


  // editSaveCertificationRecord(id) {
  //   let payload = {
  //     candidateId: JSON.parse(localStorage.getItem('candidateId')),
  //     descriptions: this.editCertificationData.descriptions,
  //     certificateName: this.editCertificationData.certificateName,
  //     certificateType: this.editCertificationData.certificateType,
  //     toDate: `${this.editCertificationData.toDate.year}-${this.editCertificationData.toDate.month}-${this.editCertificationData.toDate.day}`,
  //     fromDate: `${this.editCertificationData.fromDate.year}-${this.editCertificationData.fromDate.month}-${this.editCertificationData.fromDate.day}`
  //   }

  //   this._pricingService.editcandidateCertification(id, payload).then((response: any) => {
  //     alert(response.message)
  //     window.location.reload()
  //     console.log("🚀 ~ file: candidate.profile.component.ts:354 ~ CandidatePngParameter ~ response:", response.result.items)
  //   },
  //     error => {
  //       alert(error.message)

  //     }).catch((error) => {
  //       alert(error.message)
  //     })
  // }

  editSaveCertificationRecord(payload) {
    const index = this.certificateData.findIndex(record => record.id === payload.id);
    if (index > -1) {
      this.certificateData[index] = payload;
    }
  }
  // deleteCertificationRecord(id) {
  //   this._pricingService.deleteCandidateCertificationRecord(id).then((response: any) => {
  //     alert('Candidate Certification Record Deleted Successfully')
  //     window.location.reload()
  //   },
  //     error => {
  //       alert(error.message)

  //     }).catch((error) => {
  //       alert(error.message)
  //     })


  // }
  deleteCertificationRecord(id) {
    const index = this.certificateData.findIndex(record => record.id === id);
    if (index > -1) {
      this.certificateData.splice(index, 1);
    }
  }


  //Upload Image 
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
        this.imageState = true
      };

      var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this._pricingService.uploadFile(formData).then((response: any) => {
      console.log("🚀 ~ file: candidate.profile.component.ts:692 ~ CandidateProfileComponent ~ this.careerService.uploadFile ~ response:", response)
      this.imageUploadUrl = response?.result?.items?.file
    
      
      alert(response.message)
    }).catch((error) => {
      alert(error.message)
    })

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  reset(){
    this.avatarImage =''
    this.imageState= false
  }
}

