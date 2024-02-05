import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Input } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalConfig, ToastrService } from 'ngx-toastr';

import { EvaluationService } from './evaluation.service';
import { CandidatePoolService } from '../candidate-pool/candidate-pool.service';
import { CustomToastrComponent } from 'app/main/toastr/custom-toastr/custom-toastr.component';
import { UserlistService } from 'app/main/careers/joblisting/userlist.service';
@Component({
  selector: 'app-profile',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class Evaluation implements OnInit, OnDestroy {

  valuesArray: any[] = [];

  // public
  public contentHeader: object;
  public data: any;
  public score:number;
  public overAllComments:string;
  public overAllScore:number=0
  public overAllScoreArray:any=[];
  public commentArray:any=[];
  public toggleMenu = true;
  public Monthly = false;
  public toggleNavbarRef = false;
  public loadMoreRef = false;
  public currrentRow: any={};
  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private _unsubscribeAll: Subject<any>;
  private options: GlobalConfig;

  public values: string[] = [];
  jobData: any;
  recommendation: any;


  /**
   * Constructor
   *
   * @param {PricingService} _pricingService
   * @param {CandidatePoolService} _candidateService
   */
  constructor(private _candidateEvaluationService: EvaluationService,
    private _userListService: UserlistService,private toastr: ToastrService) {
    this._unsubscribeAll = new Subject();
    this.options = this.toastr.toastrConfig;
  }

  

  
  // Custom Success
  toastrCustomSuccess() {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.success('Have fun storming the castle!', 'Success!', customToastrRef);
  }

  // Custom Warning
  toastrCustomWarning() {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.warning('Have fun storming the castle!', 'Warning!', customToastrRef);
  }

  // Custom Danger
  toastrCustomDanger() {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.error('Have fun storming the castle!', 'Danger!', customToastrRef);
  }

  // Custom Info
  toastrCustomInfo() {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.info('Have fun storming the castle!', 'Info!', customToastrRef);
  }


  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Load More
   */
  loadMore() {
    this.loadMoreRef = !this.loadMoreRef;
    setTimeout(() => {
      this.loadMoreRef = !this.loadMoreRef;
    }, 2000);
  }

  handleroom = (e, id) => {
    const { value } = e.target;
    this.data((room) =>
      room?.map((list, index) =>
        index === id ? { ...list, room: value } : list
      )
    );
  };

  items = [
    { value: '' },
    { value: '' },
    { value: '' }
  ];

  submits() {
    // Loop through the items array and log the value of each input field
    for (let i = 0; i < this.items.length; i++) {
      console.log(`Value ${i + 1}: ${this.items[i].value}`);
    }
  }
  

  getScore(event, options){
    
    if (this.overAllScoreArray.findIndex(obj => obj.questionId === options) === -1) {
      // if it doesn't exist, add it to the array
      this.overAllScoreArray.push({
        questionId:options,
        value:parseInt(event)
      })
    }

  
    
    let sum = this.overAllScoreArray.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);

    this.overAllScore= sum /this.overAllScoreArray.length;
    

   
    // this.overAllScoreArray= this.overAllScoreArray.map((item)=>{
    //   if(options==item.questionId)
    //   { 
    //      return{
    //       ...item,
    //       value:parseInt(event)
    //     }
    //   }
    //   return item
    //   })

      console.log("🚀 ~ ", this.overAllScoreArray)

      
    
  }

  getComment(event, options){
    if (this.commentArray.findIndex(obj => obj.questionId === options) === -1) {
      // if it doesn't exist, add it to the array
      this.commentArray.push({
        questionId:options,
        comment:event
      })
    }
  }



  getRecomendationValue(event){
    this.recommendation = event.target.value
  }

  overAllCommentsFunction(event){
    this.overAllComments= event

  }

onSubmit() {

  let candidateRelatedJob = JSON.parse(localStorage.getItem('candidateRelatedJob'))


  this.overAllScoreArray.map((score)=>{
    this.commentArray.filter((item)=>{
      if(item.questionId === score.questionId){
        this.valuesArray.push({
          question:item.questionId,
          answerOfQues: item.comment,
          score: score.value
        })
      }
    })
  })
  let payload = {
    candidateRelatedJob:candidateRelatedJob,
    Recomendations:this.recommendation,
    overAllScore:Math.floor(this.overAllScore),
    overAllComments:this.overAllComments,
    factorAnswers:this.valuesArray
  }
  console.log("🚀 ~ file: evaluation.component.ts:221 ~ Evaluation ~ onSubmit ~ payload:", payload)


  this._candidateEvaluationService.candidateEvaluation(payload).then((dataResponse: any) => {  
    alert('Candidate Evaluation Successfully')
    // window.location.reload()
    // this.router.navigateByUrl(`careers/job-draft/${dataResponse.result.items.id}`)
    // localStorage.setItem('jobId', JSON.stringify(dataResponse.result.items.id))
  },
  error=>{
    alert(error.error.errors.code)
  }
  ).catch((error) => {
    console.log('sddsfas', error)
    alert(error.message)
  })

}
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._candidateEvaluationService.onPricingChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.data = response;
    });


    
    // this.jobData.map((item)=>{
    //   console.log("ttttttttttttttt",item.length)
    // })


   

    // this._userListService.onCreatorJob.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.currrentRow = response.result.items  
    //   this.data = this.currrentRow.jobsFactorsQuestions  
      
    //   console.log("🚀 ~ file: job-publish.component.ts:201 ~ JobPublishComponent ~ this._userListService.onCreatorJob.pipe ~ this.currrentRow ", this.data )
    //   });
    this._userListService.getJobById(JSON.parse(localStorage.getItem('factorJobId'))).then((response:any) => {
      this.currrentRow = response.result.items  
      this.jobData = this.currrentRow.jobsFactorsQuestions.map((item)=>{
        return{
          ...item,
          score:'',
          comment:''
        }
      })  
      
      console.log("🚀 ~ file: job-publish.component.ts:201 ~ JobPublishComponent ~ this._userListService.onCreatorJob.pipe ~ this.currrentRow ", this.jobData )
      });

    

    // content header
    this.contentHeader = {
      headerTitle: 'Profile',
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
            name: 'Pages',
            isLink: true,
            link: '/'
          },
          {
            name: 'Profile',
            isLink: false
          }
        ]
      }
    };
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

