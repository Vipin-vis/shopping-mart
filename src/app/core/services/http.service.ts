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
  /**
   * 
   * @param username 
   * @param password 
   */
  getLogin(username: string, password: string) {
    let authString: string = username + ":" + password;
    let requestbody = {
      "username": username,
      "password": password
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': 'Basic ' + btoa(authString)
        'Authorization': authString
      })
    };
    return this.http.post(this.serviceURI + '/Login', requestbody, httpOptions);
  }
  /**
   * 
   * @param searchKey 
   */
  getProducts(searchKey: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    //return this.http.post(this.serviceURI + '/searchProducts', { "search_str": searchKey }, httpOptions);
    return this.http.get(this.serviceURI + '/products');
  }
  /**
   * 
   */
  getAllOrders(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.get(this.serviceURI + 'getallOrders', httpOptions);
  }
  /**
   * 
   */
  getOrderDetails(id: string) {
    let reqParam = { "order_id": id }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + 'getallOrders', reqParam, httpOptions);
  }
}