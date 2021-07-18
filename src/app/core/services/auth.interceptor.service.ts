import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SharedService } from './shared.service';

//import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer/`,
      },
    });

    return next.handle(req);
  }
}

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly _sharedService: SharedService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._sharedService.setProgressBar(true);
    console.log("Progress Bar: ", "am here progressing");
    return next.handle(req).pipe(finalize(() => this._sharedService.setProgressBar(false)));
  }
}
 // 'Authorization': `Bearer ${AuthService.getToken()}`,