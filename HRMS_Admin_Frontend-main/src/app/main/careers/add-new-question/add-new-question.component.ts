import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { UserlistService } from '../joblisting/userlist.service';
import { FileUploader } from 'ng2-file-upload';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'app/main/components/_helpers/must-match.validator';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { QuestionListService } from '../joblisting/question.service';
@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class AddNewQuestionComponent implements OnInit {
  public value;
  public questionList=[]
  

@ViewChild('textQuestionForm') textQuestionForm: NgForm;
@ViewChild('radioQuestionForm') radioQuestionForm: NgForm;
@ViewChild('checkboxQuestionForm') checkboxQuestionForm: NgForm;
@ViewChild('uploadQuestionForm') uploadQuestionForm: NgForm;




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
    questions:''
    
    
  };

rows = [
    { questions: 'Do you have the required experience?', email:'wiwlirug@talgajup.co.uk', clientquestions: 'ABC Bank', source: 'Martin', appliedDate: '13-02-22', candidateStage: 'Hired', Rating:'3', id:'check1' },
    { questions: 'Cover Letter', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Fido', source: 'Jacob', appliedDate: '22-02-23', candidateStage: 'Engaged', Rating:'2', id:'check2'},
    { questions: 'Resume ', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Dubai Bank', source: 'Dean', appliedDate: '13-05-23', candidateStage: 'Not hired', Rating:'3' , id:'check3'},
    { questions: 'Are you proficient in English? ', email:'wiwlirug@talgajup.co.uk', clientquestions: 'ABC Bank', source: 'Sam', appliedDate: '04-12-22', candidateStage: 'Hired', Rating:'check4'},
    { questions: 'Portfolio ', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Dealer', source: 'Samantha', appliedDate: '13-02-22', candidateStage: 'Hired',Rating:'3', id:'check5'},
    { questions: 'College/Education', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Company', source: 'Jessica', appliedDate: '13-02-22', candidateStage: 'Engaged',Rating:'3', id:'check6' },
    { questions: 'Portfolio', email:'wiwlirug@talgajup.co.uk', clientquestions: 'Swiss Bank', source: 'Hayden', appliedDate: '13-02-22', candidateStage: 'Not hired',Rating:'1', id:'check7'},
    { questions: 'Education ', email:'wiwlirug@talgajup.co.uk', clientquestions: 'ABC Bank', source: 'Luther', appliedDate: '13-02-22', candidateStage: 'Not hired',Rating:'2', id:'check8' },
    
  ];
  
  // Public
  public sidebarToggleRef = false;
  
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public exportCSVData;
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previouscandidateStageFilter = '';
  public jobsQuestions;
  public checkBoxArray;
  public checkboxArray;
  public unCheckBoxArray;
  public allQuestionList;
  public jobId = Boolean;
  public selectRole: any = [
    { questions: 'All', value: '' },
    { questions: 'Admin', value: 'Admin' },
    { questions: 'Author', value: 'Author' },
    { questions: 'Editor', value: 'Editor' },
    { questions: 'Maintainer', value: 'Maintainer' },
    { questions: 'Subscriber', value: 'Subscriber' }
  ];

   public selectPlan: any = [
    { questions: 'All', value: '' },
    { questions: 'Basic', value: 'Basic' },
    { questions: 'Company', value: 'Company' },
    { questions: 'Enterprise', value: 'Enterprise' },
    { questions: 'Team', value: 'Team' }
  ];

  public selectcandidateStage: any = [
    { questions: 'All', value: '' },
    { questions: 'Engaged', value: 'Engaged' },
    { questions: 'Hired', value: 'Hired' },
    { questions: 'InHired', value: 'InHired' }
  ];

  public selectedRole = [];
  public selectedPlan = [];
  public selectedcandidateStage = [];
  public searchValue = '';

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

    // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

/**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {UserlistService} jobs
   * @param {CoreSidebarService} _coreSidebarService
   */


  constructor(
    private jobs: UserlistService,
    private questions: QuestionListService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private formBuilder: UntypedFormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

   get ReactiveUDForm() {
    return this.ReactiveUserDetailsForm.controls;
  }
  chooseField(event){
    this.value = event.target.value;
  }

  multipleChoiceSubmit(event){
  console.log("🚀 ~ file: add-new-", event)

  }
   ReactiveUDFormOnSubmit() {
    this.ReactiveUDFormSubmitted = true;

    // stop here if form is invalid
    // if (this.ReactiveUserDetailsForm.invalid) {
    //   return;
    // }
    console.log(this.ReactiveUserDetailsForm.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.ReactiveUserDetailsForm.value));
  }

   // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedRole = this.selectRole[0];
    this.selectedPlan = this.selectPlan[0];
    this.selectedcandidateStage = this.selectcandidateStage[0];

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.fullquestions.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param questions
   */
  toggleSidebar(questions): void {
    this._coreSidebarService.getSidebarRegistry(questions).toggleOpen();
  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousPlanFilter, this.previouscandidateStageFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By Plan
   *
   * @param event
   */
  filterByPlan(event) {
    const filter = event ? event.value : '';
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, filter, this.previouscandidateStageFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By candidateStage
   *
   * @param event
   */
  filterBycandidateStage(event) {
    const filter = event ? event.value : '';
    this.previouscandidateStageFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
    this.rows = this.temp;
  }

  /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param candidateStageFilter
   */
  filterRows(roleFilter, planFilter, candidateStageFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    roleFilter = roleFilter.toLowerCase();
    planFilter = planFilter.toLowerCase();
    candidateStageFilter = candidateStageFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialquestionsMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      const isPartialGenderMatch = row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
      const isPartialcandidateStageMatch = row.candidateStage.toLowerCase().indexOf(candidateStageFilter) !== -1 || !candidateStageFilter;
      return isPartialquestionsMatch && isPartialGenderMatch && isPartialcandidateStageMatch;
    });
  }

  getAllQuestions() {
    this.questions.gettAllQuestions().then((data: any) => {
     
      this.checkboxArray = data.result.items
      // this.allQuestionList = this.jobsQuestions.map((item) => {
      //   return {
      //     ...item.questionId,
      //     selected: false
      //   }
      // })
      // console.log("🚀 ~ file: add-new-question.component.ts:263 ~ AddNewQuestionComponent ~ this.allQuestionList=this.jobsQuestions.map ~ this.allQuestionList", this.allQuestionList)

      
      
      // let comparison = (a, b) => a.id !== b.id
      // let b = this.questionList.filter(b => this.allQuestionList.every(a => comparison(a, b)));
      // this.unCheckBoxArray = b.map((item) => {
      //   return {
      //     ...item,
      //     selected: false,
      //     flag:false
      //   }
      // })
      // this.checkboxArray = this.checkBoxArray.concat(this.unCheckBoxArray);
      // console.log("🚀 ~ file: job-edit.component.ts:220 ~ JobEditComponent ~ this.jobs.gettAllQuestions ~ this.checkboxArray", this.checkboxArray)

    

    
    }).catch(err => {
      console.log(err)
    })
  }

  onChange(item){
    console.log( item)
  }

  onChangeRequried(item){
    console.log(item)
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
      this.questions.addQuestion(value).subscribe((dataResponse: any) => {  
        console.log("🚀 ~ file: add-new-question.component.ts ~ line 293 ~ AddNewQuestionComponent ~ this._userListService.addQuestion ~ dataResponse", dataResponse)
        alert(dataResponse.message)
        this.checkBoxArray.push(dataResponse.result.items)

        // window.location.reload()
      },
      error=>{
        alert(error.error.errors.code)
      }
      )
      
    }
    else{
      alert('some thing went wrong please try again !')
    }
    
  }


  // submitUpload(form){
  //   let user = JSON.parse(localStorage.getItem('currentUser')).id
  //   if(form.valid){
  //     let value ={
  //       type:'upload',
  //       question:form.value.text,
  //       created_by : user,
  //       updated_by:user
  //     }
  //     this.questions.addQuestion(value).then((dataResponse: any) => {  
  //       // alert(dataResponse?.message)
  //       alert("Question Created Successfully")
  //       window.location.reload()
  //     },
  //     error=>{
  //       alert(error.error.errors.code)
  //     }
  //     ).catch((error) => {
  //       console.log('sddsfas', error)
  //       // alert(dataResponse?.message)
  //     })
      
  //   }
  //   else{
  //     alert('some thing went wrong please try again !')
  //   }
    
  // }

  // submitRadio(form){
  //   let user = JSON.parse(localStorage.getItem('currentUser')).id
  //   if(form.valid){
  //     let value ={
  //       type:'radio',
  //       question:form.value.text,
  //       created_by : user,
  //       updated_by:user
  //     }
  //     this.questions.addQuestion(value).then((dataResponse: any) => {  
  //       // alert(dataResponse?.message)
  //       alert("Question Created Successfully")
  //       window.location.reload()
  //     },
  //     error=>{
  //       alert(error.error.errors.code)
  //     }
  //     ).catch((error) => {
  //       console.log('sddsfas', error)
  //       // alert(dataResponse?.message)
  //     })
      
  //   }
  //   else{
  //     alert('some thing went wrong please try again !')
  //   }
    
  // }

  onHandleRequired(Pname:any){
    console.log("jjjjjj",Pname.defaultvalue)
  }



 ngOnInit(): void {
  //get job by id 
  // this.jobs.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
  //   if (response.result.items.id) {
  //     this.jobsQuestions = response.result.items.jobsQuestions
  //     this.checkBoxArray = this.jobsQuestions.map((item) => {
  //       return {
  //         ...item.questionId,
  //         selected: true,
  //         flag:item.flag
  //       }
  //     })
  //   }
  // })

  this.getAllQuestions()



  
    // // Subscribe config change
    // this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
    //   //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
    //   if (config.layout.animation === 'zoomIn') {
    //     setTimeout(() => {
    //       this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //         this.rows = response;
    //         this.tempData = this.rows;
    //         this.exportCSVData = this.rows;
    //       });
    //     }, 450);
    //   } else {
    //     this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //       this.rows = response;
    //       this.tempData = this.rows;
    //       this.exportCSVData = this.rows;
         
    //     });
    //   }
    // });


    
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
