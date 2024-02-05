import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserEditService implements Resolve<any> {
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
    let url = JSON.parse(localStorage.getItem('currentUser')).id
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/user/user/${url}`).subscribe((response: any) => {
        this.apiData = response;
        this.onUserEditChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }


  addUser(value:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/user/userRegister`,{user:value}).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

 

 

  gettAllUsers(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/user/users`).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }



  searchUserList(value:string): Promise<any[]> {
    let param = new HttpParams().set('username', value)
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/user/users`, {params: param}).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }



  editUser(value:any): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('userId'))
    return new Promise((resolve, reject) => {
      this._httpClient.patch(`${environment.apiUrl}/user/updateUser/${url}`,{user:value}).subscribe((response: any) => {
        this.rows = response;
        this.onUserEditChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

}
