import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';


import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TenantService implements Resolve<any> {
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
      Promise.all([this.tenantList()]).then(() => {
        resolve();
      }, reject);
    });
  }



  /**
   * Get rows
   */
  tenantList(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/tenantInformation`).subscribe((response: any) => {
        this.rows = response;
        this.onFaqsChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  searchTenantList(value:string): Promise<any[]> {
    let param = new HttpParams().set('name', value)
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/tenantInformation`, {params: param}).subscribe((response: any) => {
        this.rows = response;
        this.onFaqsChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  addTenant(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/api/tenantInformation`,value).subscribe((response: any) => {
        this.rows = response;
        this.onFaqsChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  deleteTenant(id:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`${environment.apiUrl}/api/tenantInformation/${id}`).subscribe((response: any) => {
        this.rows = response;
        this.onFaqsChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  
 
}
