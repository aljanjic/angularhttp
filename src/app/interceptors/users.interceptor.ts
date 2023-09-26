import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements HttpInterceptor {


  // Good point to handle errors or for caching 

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const API_TOKEN = 'dasd2kl13klj45123kkkads';
    const requestCopy = request.clone({setHeaders: {apy_key: API_TOKEN}, body: {'Hello': 'World'}})
    console.log(requestCopy)
    return next.handle(requestCopy);
  }
}
