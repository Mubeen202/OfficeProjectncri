import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatePoolService implements Resolve<any> {
  rows: any;
  onDatatablessChanged: BehaviorSubject<any>;
  onCandidteChange: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onDatatablessChanged = new BehaviorSubject({});
    this.onCandidteChange = new BehaviorSubject({});
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
      Promise.all([this.getAllCandidates()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  // getCandidateById(): Promise<any[]> {
  //   let url = JSON.parse(localStorage.getItem('candidateId'))
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(`${environment.apiUrl}/candidateSubmitApplication/${url}`).subscribe((response: any) => {
  //       this.rows = response;
  //       this.onCandidteChange.next(this.rows);
  //       resolve(this.rows);
  //     }, reject);
  //   });
  // }


  getAllCandidates(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/candidate`).subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  createCandidate(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/candidate`, value).subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  candidateLinkToJob(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/candidateLinkToJob`, value).subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }


  uploadFile(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/file/file`, value).subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  }

