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
  getProducts(searchKey: string, categories: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/searchProducts', { "search_str": searchKey, "product_category":  categories}, httpOptions);
   // return this.http.get(this.serviceURI + '/products');
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
  generateOrder(userName: string, productData: any, remarks: string) {
    let reqParam = {
      "userName": userName,
      "remarks": remarks,
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
  /**
   * 
   */
  getUserOrderDetails(custId: any, order_id: any) {
    return this.http.get(this.serviceURI + `/userConfirmation?cus_id=${custId}&order_id=${order_id}`);
  }
  /**
   * 
   */
  deleteOrder(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.delete(this.serviceURI + `/deleteOrder?order_id=${id}`, httpOptions)
  }
  /**
   * 
   */
  getAllPreseters() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/getAllPresenters', httpOptions);
  }
  /**
   * 
   */
  getUserTypes() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.get(this.serviceURI + '/getUserTypes', httpOptions);
  }

  /**
   * 
   */
  addRemarks(remarks: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/addRemarks', remarks, httpOptions);
  }
    /**
   * 
   */
  updateShipppingCharge(shippingCharge: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/saveShippingCharges', shippingCharge, httpOptions);
  }
  /**
   * 
   */
  getproductCategory () {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.get(this.serviceURI + '/getproductCategory ', httpOptions);
  }

  /**
   * 
   */
  deleteUser(userID: string) {
    let user = {"user_id": userID};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/deleteUser', user, httpOptions);
  
  }

  /**
   * 
   */
  changePassword(param: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/changePassword', param, httpOptions);
  
  }
}