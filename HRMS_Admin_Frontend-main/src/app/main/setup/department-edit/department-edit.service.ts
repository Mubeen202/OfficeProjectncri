import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentEditService implements Resolve<any> {
  public apiData: any;
  public onUserEditChanged: BehaviorSubject<any>;
  public url = window.location.href
  public lastValue;
  public rows=[]

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
    // let url = window.location.href.substr(this.url.lastIndexOf('/') + 1)
    let url = JSON.parse(localStorage.getItem('departmentId'))
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/department/${url}`).subscribe((response: any) => {
        this.apiData = response;
        this.onUserEditChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }


  addDepartment(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/api/department`,value).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  deleteDepartment(value:any): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('departmentId'))
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiUrl}/api/department/${url}`,value).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

 

  gettAllDepartments(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/department`).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  gettAllDepartmentsIds(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/departmentRecords`).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  searchDepartmentList(value:string): Promise<any[]> {
    let param = new HttpParams().set('name', value)
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/department`, {params: param}).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  editDepartment(value:any): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('departmentId'))
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiUrl}/api/department/${url}`,value).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

}
