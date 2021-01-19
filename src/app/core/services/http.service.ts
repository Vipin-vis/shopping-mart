import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CONFIG } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  serviceURI: string = CONFIG.api_service_uri;
  constructor(private http: HttpClient, private _auth: AuthService, private _sharedService: SharedService) {

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
  getProducts(searchKey: string, category: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/searchProducts', { "search_str": searchKey, "product_category":  category}, httpOptions);
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
    return this.http.post(this.serviceURI + '/getallOrders', { 'username': this._sharedService.username }, httpOptions);
  }
  /**
   * 
   */
  getOrderDetails(id: string) {
    let reqParam = {
      "order_id": id,
      "username": this._sharedService.username
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/getOrderDetails', reqParam, httpOptions);
  }
  /**
   * 
   */
  addProduct(products: any) {
    //let reqParam = { "products": products }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/addproduct', products, httpOptions);
  }
  /**
   * 
   */
  getUSer(userId: string) {
    let reqParam = { "user_id": userId }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/getUserDetails', reqParam, httpOptions);
  }
  /**
   * 
   */
  editUSer(user: any) {
    //let reqParam = { "user": user }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/editUser', user, httpOptions);
  }
  /**
   * 
   */
  addUSer(user: any) {
    //let reqParam = { "user": user }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/addUser', user, httpOptions);
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
    return this.http.get(this.serviceURI + '/getAllUsers', httpOptions);
  }

  /**
   * 
   */
  saveUserDetails(user: any) {
        const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/userConfirmation', user, httpOptions);
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
    console.log("reqpam:",reqParam)
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
  deleteOrder(id:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + `/deleteOrder?order_id=${id}`,{}, httpOptions)
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
  
  /**
   * 
   */
  changePaymentStatus(param: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/changePaymentStatus', param, httpOptions);
  
  }
  
  /**
   * 
   */
  changeOrderStatus(param: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/changeOrderStatus', param, httpOptions);
  
  }
  /**
   * 
   */
  editOrder(param: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.post(this.serviceURI + '/editOrder', param, httpOptions);
  
  }
   /**
   * 
   */
  getShipment() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
    return this.http.get(this.serviceURI + '/getShipment', httpOptions);
  
  }
}