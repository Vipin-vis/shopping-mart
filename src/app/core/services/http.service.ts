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
    return this.http.get(this.serviceURI + '/getallOrders', httpOptions);
  }
  /**
   * 
   */
  getOrderDetails(id: any) {
    let reqParam = { "order_id": id }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/Getorderdetails', reqParam, httpOptions);
  }
  /**
   * 
   */
  addProduct(products: any) {
    let reqParam = { "products": products }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/addproduct', reqParam, httpOptions);
  }
  /**
   * 
   */
  getUSer(userId: string) {
    let reqParam = { "userId": userId }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/getUser', reqParam, httpOptions);
  }
  /**
   * 
   */
  editUSer(user: any) {
    let reqParam = { "user": user }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/editUser', reqParam, httpOptions);
  }
  /**
   * 
   */
  addUSer(user: any) {
    let reqParam = { "user": user }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/addUser', reqParam, httpOptions);
  }
  
  /**
   * 
   */
  getAllUSers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.get(this.serviceURI + '/users', httpOptions);
  }

  /**
   * 
   */
  saveUserDetails(user: any) {
    let reqParam = { "user": user }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/userConfirmation', reqParam, httpOptions);
  }
  /**
  * 
  */
  generateOrder(userName: string, productData: any) {
    let reqParam = {
      "userName": userName,
      "order_product_data": productData
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/generateOrder', reqParam, httpOptions);
  }
}