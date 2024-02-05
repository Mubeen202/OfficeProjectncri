import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { EmailService } from './email.service';
import { EmailService } from 'app/main/apps/email/email.service';
@Component({
  selector: 'app-new-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'email-application' }
})
export class EmailComponent {
  public emailData: any= [];
  /**
   *
   * @param {DOCUMENT} document
   * @param {ActivatedRoute} route
   * @param {EmailService} _emailService
   */
  constructor(@Inject(DOCUMENT) private document, private route: ActivatedRoute, private _emailService: EmailService) {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  getAllEmailRecords() {
    let value = {
      candidateId:[JSON.parse(localStorage.getItem('candidateId'))]
    }
    this._emailService.getEmailRecords(value).then((data: any) => {
      data.result.items.map((item)=>{
        item.map((item)=>{
          this.emailData.push(item)
        })
      })

      console.log("🚀 ~ file: email.component.ts:39 ~ EmailComponent ~ item.map ~ this.emailData", this.emailData)

    }).catch(err => {
      console.log(err)
    })
  }
  ngOnInit(): void {
    this.getAllEmailRecords()
    // Update Search Text on QueryParams Change
    this.route.queryParams.subscribe(val => {
      this._emailService.updateSearchText(val.q);
    });
  }
}
