import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener, Input, ElementRef } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApplyFormService } from 'app/main/components/applyform/applyform.service';
import { CoreConfigService } from '@core/services/config.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import internal from 'assert';

@Component({
  selector: 'app-applyform',
  templateUrl: './applyform.component.html',
  styleUrls: ['./applyform.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ApplyformComponent implements OnInit {

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
  public registerForm: any = FormGroup;
  public submitted = false;
  public firstname: String;
  public lastname: String;
  public lastorg: String;
  public address: String;
  public state: String;
  public language: String;
  public country: String;
  public timezone: String;
  public currency: String;
  public phone : number;
  public zipcode : number;
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
   * @param {ApplyFormService} applyformService 
   */
  constructor(private applyformService: ApplyFormService,
    private _coreConfigService: CoreConfigService,
    private formBuilder: FormBuilder) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    // this._coreConfigService.config = {
    //   layout: {
    //     navbar: {
    //       hidden: true
    //     },
    //     menu: {
    //       hidden: true
    //     },
    //     footer: {
    //       hidden: true
    //     },
    //     customizer: false,
    //     enableLocalStorage: false
    //   }
    // };


  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Changes
   */
  ngOnInit(): void {
    
  }
  submitApplication() {
    
    if(this.firstname && this.email && this.linkedInUrl && this.socialUrl !== null){
      let value = {
        name: this.firstname,
        email: this.email,
        linkedInUrl: this.linkedInUrl,
        socialUrl: this.socialUrl,
        resumeUpload: this.resumeUpload,
        coverLetter: this.coverLetter
      }
      this.applyformService.submitApplication(value).then((dataResponse: any) => {
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


  uploadResume(event){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);

    this.applyformService.uploadFile(formData).then((response:any)=>{
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
      this.applyformService.uploadFile(formData).then((response:any)=>{
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
