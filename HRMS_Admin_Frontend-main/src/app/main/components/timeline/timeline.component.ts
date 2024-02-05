import { Component, OnInit, Input } from '@angular/core';
import * as snippet from 'app/main/components/timeline/timeline.snippetcode';
import { CandidateEducation } from './timeline.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'app/main/view-candidates/profile/profile.service';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  // public
  public contentHeader: object;
  public showReportBasic = true;
  public showReportIcons = true;

  // snippet code variables
  public _snippetCodeBasic = snippet.snippetCodeBasic;
  public _snippetCodeIcons = snippet.snippetCodeIcons;

    //**************Education************ */
    public educationType: string
    public institutionName: string
    public degreeName: string
    public toDate: NgbDateStruct
    public fromDate: NgbDateStruct
    public descriptions: string
  
  
  
    //**************Experience************ */
    public organization: string
    public position: string
    public toDateExperience: NgbDateStruct
    public fromDateExperience: NgbDateStruct
    public descriptionsOfExperience: string
    
  
  
    //**************Certification************ */
    public certificateType: string
    public certificateName: string
    public toDateCertificate: NgbDateStruct
    public fromDateCertificate: NgbDateStruct
    public descriptionsOfCertification: string


  @Input() currentUser;
  educationData: any = [];
  experienceData: any=[];
  certificateData: any=[];

  public editEducationData: any = {};
  public editCertificationData: any = {};
  public editExperienceData: any = {};
  public educationId: string;
  public experienceId: string;
  public certificateId: string;

  constructor(private modalService: NgbModal,
    private _pricingService: ProfileService,
    private _educationService:CandidateEducation) {}
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


    //***************Education********** */

 // Education
 modalOpenXL(modalXL) {
 
    this.modalService.open(modalXL, {
      centered: true,
      size: 'lg'
    });

}

EducationSubmit() {
  let payload = {
    candidateId: JSON.parse(localStorage.getItem('candidateId')),
    institutionName: this.institutionName,
    degreeName: this.degreeName,
    descriptions: this.descriptions,
    educationType: this.educationType,
    toDate: `${this.toDate.year}-${this.addLeadingZero(this.toDate.month)}-${this.addLeadingZero(this.toDate.day)}`,
    fromDate: `${this.fromDate.year}-${this.addLeadingZero(this.fromDate.month)}-${this.addLeadingZero(this.fromDate.day)}`
  }


  this._pricingService.candidateEducation(payload).then((response: any) => {
    alert(response.message)
    window.location.reload()
  },
    error => {
      alert(error.message)

    }).catch((error) => {
      alert(error.message)
    })
}




  editEducationRecord(editModalXL, id) {
    this.modalService.open(editModalXL, {
      centered: true,
      size: 'lg'
    });
    this._pricingService.getCandidateEducationData(id).then((response: any) => {
      this.editEducationData = response

      this.editEducationData.fromDate = this.formatDate(this.editEducationData.fromDate)
      this.editEducationData.toDate = this.formatDate(this.editEducationData.toDate)

    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })

  }
  addLeadingZero(num) {
    return num < 10 ? '0' + num : num;
  }

   editSaveEducationRecord(id) {
    let payload = {
      candidateId: JSON.parse(localStorage.getItem('candidateId')),
      institutionName: this.editEducationData.institutionName,
      degreeName: this.editEducationData.degreeName,
      descriptions: this.editEducationData.descriptions,
      educationType: this.editEducationData.educationType,
      toDate: `${this.editEducationData.toDate.year}-${this.addLeadingZero(this.editEducationData.toDate.month)}-${this.addLeadingZero(this.editEducationData.toDate.day)}`,
      fromDate: `${this.editEducationData.fromDate.year}-${this.addLeadingZero(this.editEducationData.fromDate.month)}-${this.addLeadingZero(this.editEducationData.fromDate.day)}`
    }

    this._pricingService.editcandidateEducation(id, payload).then((response: any) => {
      alert(response.message)
      window.location.reload()
      console.log("🚀 ~ file: candidate.profile.component.ts:354 ~ CandidatePngParameter ~ response:", response.result.items)
    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })
  }

  

  deleteEducationRecordPopUp(deleteModalXL,id) {

    this.modalService.open(deleteModalXL, {
      centered: true,
      size: 'sm'
    });
    this.educationId = id 
   


  }

  deleteEducationRecord() {

    this._pricingService.deleteCandidateEducationRecord(this.educationId).then((response: any) => {
      alert('Candidate Education Record Deleted Successfully')
      window.location.reload()
    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })


  }


    //***************Experience********** */

    // Experience Modal open
   modalOpenExperience(modalXL) {
      this.modalService.open(modalXL, {
        centered: true,
        size: 'lg'
      });

   
  }

  
  ExperienceSubmit() {
    let payload = {
      candidateId: JSON.parse(localStorage.getItem('candidateId')),
      organizationId: this.organization,
      position: this.position,
      descriptions: this.descriptionsOfExperience,
      toDate: `${this.toDateExperience.year}-${this.addLeadingZero(this.toDateExperience.month)}-${this.addLeadingZero(this.toDateExperience.day)}`,
      fromDate: `${this.fromDateExperience.year}-${this.addLeadingZero(this.fromDateExperience.month)}-${this.addLeadingZero(this.fromDateExperience.day)}`
    }


    

    console.log("🚀 ~ file: candidate.profile.component.ts:744 ~ CandidateProfileComponent ~ CertificationSubmit ~ payload:", payload)

    this._pricingService.candidateExperience(payload).then((response: any) => {
      alert(response.message)
      window.location.reload()
    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })
  }
  editExperienceRecord(editModalXL, id) {
    this.modalService.open(editModalXL, {
      centered: true,
      size: 'lg'
    });
    this._pricingService.getCandidateExperienceData(id).then((response: any) => {
      this.editExperienceData = response

      this.editExperienceData.fromDate = this.formatDate(this.editExperienceData.fromDate)
      this.editExperienceData.toDate = this.formatDate(this.editExperienceData.toDate)

    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })

  }
 

   editSaveExperienceRecord(id) {
    let payload = {
      candidateId: JSON.parse(localStorage.getItem('candidateId')),
      descriptions: this.editExperienceData.descriptions,
      organizationId: this.editExperienceData.organizationId,
      certificateName: this.editExperienceData.certificateName,
      certificateType: this.editExperienceData.certificateType,
      toDate: `${this.editExperienceData.toDate.year}-${this.addLeadingZero(this.editExperienceData.toDate.month)}-${this.addLeadingZero(this.editExperienceData.toDate.day)}`,
      fromDate: `${this.editExperienceData.fromDate.year}-${this.addLeadingZero(this.editExperienceData.fromDate.month)}-${this.addLeadingZero(this.editExperienceData.fromDate.day)}`
    }

    this._pricingService.editcandidateExperience(id, payload).then((response: any) => {
      alert(response.message)
      window.location.reload()
      console.log("🚀 ~ file: candidate.profile.component.ts:354 ~ CandidatePngParameter ~ response:", response.result.items)
    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })
  }

  deleteExperienceRecordPopUp(deleteModalXL,id) {

    this.modalService.open(deleteModalXL, {
      centered: true,
      size: 'sm'
    });
    this.experienceId = id 
   


  }

  deleteExperienceRecord() {

    this._pricingService.deleteCandidateExperienceRecord(this.experienceId).then((response: any) => {
      alert('Candidate Experience Record Deleted Successfully')
      window.location.reload()
    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })


  }





   // Cerification
   modalOpenCertification(modalXL ) {
      this.modalService.open(modalXL, {
        centered: true,
        size: 'lg'
      });
  }

 CertificationSubmit() {
    let payload = {
      candidateId: JSON.parse(localStorage.getItem('candidateId')),
      descriptions: this.descriptionsOfCertification,
      certificateName: this.certificateName,
      certificateType: this.certificateType,
      toDate: `${this.toDateCertificate.year}-${this.addLeadingZero(this.toDateCertificate.month)}-${this.addLeadingZero(this.toDateCertificate.day)}`,
      fromDate: `${this.fromDateCertificate.year}-${this.addLeadingZero(this.fromDateCertificate.month)}-${this.addLeadingZero(this.fromDateCertificate.day)}`
    }

    console.log("🚀 ~ file: candidate.profile.component.ts:744 ~ CandidateProfileComponent ~ CertificationSubmit ~ payload:", payload)

    this._pricingService.candidateCertification(payload).then((response: any) => {
      alert(response.message)
      window.location.reload()
    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })
  }

  editCertificationRecord(editModalXL, id) {
    this.modalService.open(editModalXL, {
      centered: true,
      size: 'lg'
    });
    this._pricingService.getCandidateCertificationData(id).then((response: any) => {
      this.editCertificationData = response

      this.editCertificationData.fromDate = this.formatDate(this.editCertificationData.fromDate)
      this.editCertificationData.toDate = this.formatDate(this.editCertificationData.toDate)

    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })

  }
 

   editSaveCertificationRecord(id) {
    let payload = {
      candidateId: JSON.parse(localStorage.getItem('candidateId')),
      descriptions: this.editCertificationData.descriptions,
      certificateName: this.editCertificationData.certificateName,
      certificateType: this.editCertificationData.certificateType,
      toDate: `${this.editCertificationData.toDate.year}-${this.addLeadingZero(this.editCertificationData.toDate.month)}-${this.addLeadingZero(this.editCertificationData.toDate.day)}`,
      fromDate: `${this.editCertificationData.fromDate.year}-${this.addLeadingZero(this.editCertificationData.fromDate.month)}-${this.addLeadingZero(this.editCertificationData.fromDate.day)}`
    }

    this._pricingService.editcandidateCertification(id, payload).then((response: any) => {
      alert(response.message)
      window.location.reload()
      console.log("🚀 ~ file: candidate.profile.component.ts:354 ~ CandidatePngParameter ~ response:", response.result.items)
    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })
  }

  deleteCertificateRecordPopUp(deleteModalXL,id) {

    this.modalService.open(deleteModalXL, {
      centered: true,
      size: 'sm'
    });
    this.certificateId = id 
   


  }

  deleteCertificateRecord() {

    this._pricingService.deleteCandidateCertificationRecord(this.certificateId).then((response: any) => {
      alert('Candidate Certificate Record Deleted Successfully')
      window.location.reload()
    },
      error => {
        alert(error.message)

      }).catch((error) => {
        alert(error.message)
      })


  }


 
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.educationData = this.currentUser.candidateEducation.filter((item)=>( item.status==true))
    this.experienceData = this.currentUser.candidateExperience.filter((item)=>( item.status==true))
    this.certificateData = this.currentUser.candidateCertificates.filter((item)=>( item.status==true))
    console.log("🚀 ~ file: timeline.component.ts:66 ~ TimelineComponent ~ ngOnInit ~ this.certificateData", this.certificateData)

    // content header
    this.contentHeader = {
      headerTitle: 'Timeline',
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
            name: 'Components',
            isLink: true,
            link: '/'
          },
          {
            name: 'Timeline',
            isLink: false
          }
        ]
      }
    };
  }
}
