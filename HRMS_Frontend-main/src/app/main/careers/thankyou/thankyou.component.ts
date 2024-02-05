import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';


@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  
   public coreConfig: any;

  constructor(
     private _coreConfigService: CoreConfigService,
  ) { 

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

  ngOnInit(): void {
  }

}
