import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import {Router} from '@angular/router';

import { catchError , first} from 'rxjs/operators';

import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * 
   */

  /**
   *
   * @param {HttpClient} _http
   * @param @param {AuthenticationService} _authenticationService
   * @param {Router} router
   */
  constructor(private _authenticationService: AuthenticationService,
    private router: Router,
    private _http: HttpClient
    ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // console.log('error is taht', err.error.messages.map(item=>{return item.message}))
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
        if(err.error.detail=='Given token not valid for any token type'){
          // navigate /delete cookies or whatever
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        this.router.navigateByUrl(`/pages/authentication/login-v2`);
        }
        else{
          
         this._authenticationService.refreshToken(JSON.parse(localStorage.getItem('token'))).pipe(first())
          .subscribe(
            data => {

              console.log('running')
            },
            error => {
              
            }
      );

          
        }
        
        //  this.refreshToken()
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.headers); // or EMPTY may be appropriate here
    }
    return throwError(err);
}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._authenticationService.currentUserValue;
    const local = JSON.parse(localStorage.getItem('token'))
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${local}`
        }
      });
    }

    return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));
  }
}
