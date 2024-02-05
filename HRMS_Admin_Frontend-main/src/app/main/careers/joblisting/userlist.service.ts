import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserlistService implements Resolve<any> {
  public rows: any;
  public onUserListChanged: BehaviorSubject<any>;
  public onCreatorJob: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onUserListChanged = new BehaviorSubject({});
    this.onCreatorJob = new BehaviorSubject({});
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
      Promise.all([this.getApiData(), this.getCreatorJob()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
   getApiData(): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('jobId'))
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/jobGetById/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getCreatorJob(): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('jobId'))
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/jobGetById/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCreatorJob.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getJobById(url): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/jobGetById/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCreatorJob.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  addJob(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/api/jobs`,value).subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  publishJob(value): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('jobId'))
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiUrl}/api/jobPublish/${url}`, value).subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  deleteJob(value:any): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('departmentId'))
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiUrl}/api/department/${url}`,value).subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

 

  gettAllJobs(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/allJobs`).subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getAllCandidates(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/candidate`).subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

 
  editJob(value:any): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('jobId'))
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiUrl}/api/job/${url}`,value).subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }



}
