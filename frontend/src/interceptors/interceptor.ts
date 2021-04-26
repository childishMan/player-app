import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers;

    if(!req.url.includes('/upload/')){
      headers = headers.set('Content-Type','application/json');
    }
      
    
    let token = localStorage.getItem('token');
    if (token) {
      headers = headers.set(
        'Authorization',
        'Bearer ' + token
      );
    }

    console.log(headers)

    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
