import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';


import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class jobSampleService implements Resolve<any> {
  rows: any;
  onFaqsChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onFaqsChanged = new BehaviorSubject({});
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
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/jobs`).subscribe((response: any) => {
        this.rows = response;
        this.onFaqsChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getDepartmentNameById(id:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/department/${id}`).subscribe((response: any) => {
        this.rows = response;
        this.onFaqsChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  submitApplication(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/candidateSubmitApp`, value).subscribe((response: any) => {
        this.rows = response;
        this.onFaqsChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  uploadFile(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/file/file`, value).subscribe((response: any) => {
        this.rows = response;
        this.onFaqsChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

 
}
