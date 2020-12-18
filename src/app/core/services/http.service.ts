import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CONFIG } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  serviceURI: string = CONFIG.api_service_uri;
  constructor(private http: HttpClient, private _auth: AuthService) {

  }
  getLogin(username: string, password: string) {
    let authString:string = username + ":" + password;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(authString)
      })
    };
    return this.http.get(this.serviceURI + '/login', httpOptions);
  }
  getProducts(searchKey: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    //return this.http.get(this.serviceURI + '/products', httpOptions);
    return this.http.get(this.serviceURI + '/products');
  }

  getAllOrders(): Observable<any> {
    return this.http.get(this.serviceURI + 'getallorders');
  }

}
