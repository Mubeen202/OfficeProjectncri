import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue() {
    return localStorage.getItem('token')!=null
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/user/login`, { user:{email, password} })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          console.log('this is running', user.user)

          if (user.user && user.user.tokens) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.user));
            localStorage.setItem('token', JSON.stringify(user.user.tokens.access));

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'You have successfully logged in as an ' +
                  user.role +
                  ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
                '👋 Welcome, ' + user.firstName + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }
  refreshToken(token:string) {
    return this._http
      .post<any>(`${environment.apiUrl}user/token/refresh`, {refresh :token} )
      .pipe(
        map(token => {
          // login successful if there's a jwt token in the response
          console.log('this is running', token)

        
        })
      );
  }

  IsLoggedIn(){
    return localStorage.getItem('currentUser')!=null;
  }
 

  /**
   * User logout
   *
   */
   logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('token');
    localStorage.clear()
    
    // notify
    this.currentUserSubject.next(null);
  }
}
