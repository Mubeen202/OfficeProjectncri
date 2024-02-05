import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EvaluationService implements Resolve<any> {
  rows: any;
  onPricingChanged: BehaviorSubject<any>;
  onCandidteChange: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onPricingChanged = new BehaviorSubject({});
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
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */


  //   getCandidateById(): Promise<any[]> {
  //   let url = JSON.parse(localStorage.getItem('candidateId'))
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(`${environment.apiUrl}/candidate/${url}`).subscribe((response: any) => {
  //       this.rows = response;
  //       this.onCandidteChange.next(this.rows);
  //       resolve(this.rows);
  //     }, reject);
  //   });
  // }

  candidateEvaluation(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/candidateEvaluation`, value).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }


  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/profile-data').subscribe((response: any) => {
        this.rows = response;
        this.onPricingChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
