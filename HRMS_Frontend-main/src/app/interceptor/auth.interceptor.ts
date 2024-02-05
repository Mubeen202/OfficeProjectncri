import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  static accessToken = ""

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
      const token = req.clone({
        setHeaders: {
          // Content-Type:  'application/json',
          Authorization: `Bearer xx.yy.zz`
        }
      });
      return next.handle(token);
  
  }
}
