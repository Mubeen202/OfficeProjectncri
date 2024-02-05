import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyEditService implements Resolve<any> {
  public apiData: any;
  public onUserEditChanged: BehaviorSubject<any>;
  public url = window.location.href
  public lastValue;
  /**
   * Constructor
   *
   * @param {Router} router
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient, private router: Router) {
    // Set the defaults
    this.onUserEditChanged = new BehaviorSubject({});
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get API Data
   */
  // getApiData(): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get('api/users-data').subscribe((response: any) => {
  //       this.apiData = response;
  //       this.onUserEditChanged.next(this.apiData);
  //       resolve(this.apiData);
  //     }, reject);
  //   });
  // }

  getApiData(): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('companyId'))
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/company/${url}`).subscribe((response: any) => {
        this.apiData = response;
        this.onUserEditChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  editCompany(value:any): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('companyId'))
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiUrl}/api/company/${url}`,value).subscribe((response: any) => {
        this.apiData = response;
        this.onUserEditChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  getCompanyInformation(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/company`).subscribe((response: any) => {
        this.apiData = response;
        this.onUserEditChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  

}



