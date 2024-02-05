import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener, Input, ElementRef } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CareersService } from 'app/main/careers/careers.service';
import { CoreConfigService } from '@core/services/config.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-faq',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CareerComponent implements OnInit {

  @ViewChild("outlet", {read: ViewContainerRef}) outletRef: ViewContainerRef;
  @ViewChild("content", {read: TemplateRef}) contentRef: TemplateRef<any>;

  ngAfterContentInit() {
    this.outletRef.createEmbeddedView(this.contentRef);
  }
  // public
  public coreConfig: any;
  public contentHeader: object;
  public data: any = [];
  public dataResponse = {}
  public searchText: string;
  public date: any = [];
  public registerForm: any = FormGroup;
  public submitted = false;
  public name: String
  public email: String
  public linkedInUrl: String
  public socialUrl: String
  public resumeUpload: String
  public coverLetter: String






  // private
  private _unsubscribeAll: Subject<any>;


  /**
   * Constructor
   *
   * @param {CareersService} careerService 
   */
  constructor(private careerService: CareersService,
    private _coreConfigService: CoreConfigService,
    private formBuilder: FormBuilder) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };


  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Changes
   */
  ngOnInit(): void {
    this.refreshCareerList()
  }
  submitApplication() {
    
    if(this.name && this.email && this.linkedInUrl && this.socialUrl !== null){
      let value = {
        name: this.name,
        email: this.email,
        linkedInUrl: this.linkedInUrl,
        socialUrl: this.socialUrl,
        resumeUpload: this.resumeUpload,
        coverLetter: this.coverLetter
      }
      this.careerService.submitApplication(value).then((dataResponse: any) => {
        this.dataResponse = dataResponse
        alert(dataResponse?.message)
     
      }).catch((dataResponse: any) => {
        alert(dataResponse?.message)
      })
    }
    else{
      alert('Please Fill all fields and then send')
    }
  }
  timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
    }
  refreshCareerList() {
    this.careerService.careerJobs().then((data: any) => {
      this.data = data.result.items.map(item =>{
        let date =  moment(item.updated_at).minute()

        // let date = this.timeConvert(item.updated_at)
        console.log("🚀 ~ file: career.component.ts ~ line 131 ~ CareerComponent ~ this.careerService.careerJobs ~ date", date)
        item.updated_at = date 
        return item
      })
    }).catch(err => {
      console.log(err)
    })

    //Add User form validations
    this.registerForm = this.formBuilder.group({
      imageInput: ['', [Validators.required]],

    });

  }

  uploadResume(event){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);

    this.careerService.uploadFile(formData).then((response:any)=>{
      this.resumeUpload= response?.result?.items?.file
      alert(response.message)
    }).catch((error)=>
    {
      alert(error.message)
    })
    
  }
  uploadCoverLetter(event){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);
    if (file.type == "application/pdf"){
      console.log('this is runngin ')
      this.careerService.uploadFile(formData).then((response:any)=>{
        this.coverLetter= response?.result?.items?.file
        alert(response.message)}).catch((error)=>
        {
          alert(error.message)
        })
    }
    else {
      //call validation
      alert('File Formate is incorrect')
    }


    
    
  }





}
