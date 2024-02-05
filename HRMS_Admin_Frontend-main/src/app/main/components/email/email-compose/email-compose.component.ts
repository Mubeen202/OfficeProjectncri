import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EmailService} from 'app/main/apps/email/email.service';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmailComposeComponent implements OnInit {
  // Decorator
  @HostListener('keydown.escape') fn() {
    this.closeCompose();
  }
  @ViewChild('selectRef') private _selectRef: any;

  // Public
  // public emailToSelect = [
  //   { name: 'Jane Foster', avatar: 'assets/images/portrait/small/avatar-s-3.jpg' },
  //   { name: 'Donna Frank', avatar: 'assets/images/portrait/small/avatar-s-1.jpg' },
  //   { name: 'Gabrielle Robertson', avatar: 'assets/images/portrait/small/avatar-s-4.jpg' },
  //   { name: 'Lori Spears', avatar: 'assets/images/portrait/small/avatar-s-6.jpg' }
  // ];

  public emailCCSelect = [
    {
      name: 'Jane Foster',
      avatar: 'assets/images/portrait/small/avatar-s-3.jpg',
    },
    {
      name: 'Donna Frank',
      avatar: 'assets/images/portrait/small/avatar-s-1.jpg',
    },
    {
      name: 'Gabrielle Robertson',
      avatar: 'assets/images/portrait/small/avatar-s-4.jpg',
    },
    {
      name: 'Lori Spears',
      avatar: 'assets/images/portrait/small/avatar-s-6.jpg',
    },
  ];

  public emailBCCSelect = [
    {
      name: 'Jane Foster',
      avatar: 'assets/images/portrait/small/avatar-s-3.jpg',
    },
    {
      name: 'Donna Frank',
      avatar: 'assets/images/portrait/small/avatar-s-1.jpg',
    },
    {
      name: 'Gabrielle Robertson',
      avatar: 'assets/images/portrait/small/avatar-s-4.jpg',
    },
    {
      name: 'Lori Spears',
      avatar: 'assets/images/portrait/small/avatar-s-6.jpg',
    },
  ];

  public emailCCSelected = [];
  public emailBCCSelected = [];
  public emailData=[]
  public isOpenCC = false;
  public isOpenBCC = false;

  public isComposeOpen: boolean = false;

  public subject;
  public message;
  public recipients = [];
  public something = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {EmailService} _emailService
   */
  constructor(private _emailService: EmailService) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  onSelectChange(value) {
    console.log(
      '🚀 ~ file: email-compose.component.ts:99 ~ EmailComposeComponent ~ onSelectChange ~ value',
      value
    );
    this.recipients = [value];
    this.recipients.map((item) => {
      return item.name;
    });
  }

  /**
   * Toggle CC & BCC
   *
   * @param toggleRef
   */
  togglCcBcc(toggleRef) {
    if (toggleRef == 'cc') {
      this.isOpenCC = !this.isOpenCC;
    } else {
      this.isOpenBCC = !this.isOpenBCC;
    }
  }

  /**
   * Close Compose
   */
  closeCompose() {
    this.isComposeOpen = false;
    this._emailService.composeEmail(this.isComposeOpen);
  }

  sendEmail() {
    let user = JSON.parse(localStorage.getItem('currentUser')).id
    let candidateId = JSON.parse(localStorage.getItem('candidateId'));

    let value = {
      name: user,
      candidateId: candidateId,
      email: ['syed.ajwad@ncrisolutions.com', 'mubeen.sheikh@ncri.com'],
      subject: this.subject,
      describe: this.message,
    };

    this._emailService.sendEmail(value).then((dataResponse: any) => {
      console.log("🚀 ~ file: email-compose.component.ts:91 ~ EmailComposeComponent ~ this._emailService.createNotes ~ dataResponse", dataResponse)
      alert('candidate notes is created successfully')
      this.isComposeOpen = false;
      this._emailService.composeEmail(this.isComposeOpen);
       // window.location.reload()
     },
     error=>{
       alert(error.error.errors.code)
     }
     ).catch((error) => {
       console.log('sddsfas', error)
       alert(error.message)
     })

    console.log(
      '🚀 ~ file: email-compose.component.ts:128 ~ EmailComposeComponent ~ sendEmail ~ value',
      value
    );
  }

  getAllEmail() {
    
    let value = {
      candidateId:[JSON.parse(localStorage.getItem('candidateId'))]
    }
    this._emailService.getCandidateRecords(value).then((data: any) => {
      data.result.items.map((item)=>{
        item.map((item)=>{
          this.emailData.push(item)
        })
      })

      console.log("🚀 ~ file: email-list-item.component.ts:54 ~ EmailListItem ~ this.notesData", this.emailData)
    }).catch(err => {
      console.log(err)
    })
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this.getAllEmail()
    // Subscribe to Compose Model Changes
    this._emailService.composeEmailChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        this.isComposeOpen = response;
        if (this.isComposeOpen) {
          setTimeout(() => {
            this._selectRef.searchInput.nativeElement.focus();
          }, 0);
        }
      });
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
