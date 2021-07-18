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
  httpOptions: any;
  constructor(private http: HttpClient, private _auth: AuthService, private _sharedService: SharedService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
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
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/searchProducts', { "search_str": searchKey, "product_category": category }, httpOptions);
    // return this.http.get(this.serviceURI + '/products');
  }
  /**
   * 
   */
  getAllOrders(): Observable<any> {
    const httpOptions = this.setHttpOptions();
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
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/getOrderDetails', reqParam, httpOptions);
  }
  /**
   * 
   */
  addProduct(products: any) {
    //let reqParam = { "products": products }
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/addproduct', products, httpOptions);
  }
  /**
   * 
   */
  getUSer(userId: string) {
    let reqParam = { "user_id": userId }
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/getUserDetails', reqParam, httpOptions);
  }
  /**
   * 
   */
  editUSer(user: any) {
    //let reqParam = { "user": user }
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/editUser', user, httpOptions);
  }
  /**
   * 
   */
  addUSer(user: any) {
    //let reqParam = { "user": user }
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/addUser', user, httpOptions);
  }

  /**
   * 
   */
  getAllUSers() {
    const httpOptions = this.setHttpOptions();
    return this.http.get(this.serviceURI + '/getAllUsers', httpOptions);
  }

  /**
   * 
   */
  saveUserDetails(user: any) {
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/userConfirmation', user, httpOptions);
  }
  /**
  * 
  */
  generateOrder(userName: string, productData: any, remarks: string, presenter: any, phoneNumber?: any) {
    let reqParam = {
      "userName": userName,
      "remarks": remarks,
      "presenter": presenter,
      "order_product_data": productData,
      "contact_number": phoneNumber
    }
    const httpOptions = this.setHttpOptions();
    console.log("reqpam:", reqParam)
    return this.http.post(this.serviceURI + '/generateOrder', reqParam, httpOptions);
  }
  /**
   * 
   */
  getUserOrderDetails(custId: any, order_id: any, option: any) {
    return this.http.get(this.serviceURI + `/userConfirmation?cus_id=${custId}&order_id=${order_id}
    &option=${option}`);
  }
  /**
   * 
   */
  deleteOrder(id: string) {
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + `/deleteOrder?order_id=${id}`, {}, httpOptions)
  }
  /**
   * 
   */
  getAllPreseters() {
    const httpOptions = this.setHttpOptions();
    return this.http.get(this.serviceURI + '/getAllPresenters', httpOptions);
  }
  /**
   * 
   */
  getUserTypes() {
    const httpOptions = this.setHttpOptions();
    return this.http.get(this.serviceURI + '/getUserTypes', httpOptions);
  }

  /**
   * 
   */
  addRemarks(remarks: any) {
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/addRemarks', remarks, httpOptions);
  }
  /**
 * 
 */
  updateShipppingCharge(shippingCharge: any) {
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/saveShippingCharges', shippingCharge, httpOptions);
  }
  /**
   * 
   */
  getproductCategory() {
    const httpOptions = this.setHttpOptions();
    return this.http.get(this.serviceURI + '/getproductCategory ', httpOptions);
  }
  
  /**
   * 
   */
   getFabOneproductCategory() {
    const httpOptions = this.setFabOneHttpOptions();
    return this.http.get(CONFIG.fab_one_uri + '/categories', httpOptions);
  }

  /**
   * 
   */
  deleteUser(userID: string) {
    let user = { "user_id": userID };
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/deleteUser', user, httpOptions);

  }

  /**
   * 
   */
  changePassword(param: any) {
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/changePassword', param, httpOptions);

  }

  /**
   * 
   */
  changePaymentStatus(param: any) {
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/changePaymentStatus', param, httpOptions);

  }

  /**
   * 
   */
  changeOrderStatus(param: any) {
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/changeOrderStatus', param, httpOptions);

  }
  /**
   * 
   */
  editOrder(param: any) {
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + '/editOrder', param, httpOptions);

  }
  /**
  * 
  */
  getShipment() {
    const httpOptions = this.setHttpOptions();
    return this.http.get(this.serviceURI + '/getShipment', httpOptions);

  }
  /**
  * 
  */
  getShippingTypes() {
    const httpOptions = this.setHttpOptions();
    return this.http.get(this.serviceURI + '/getShippingTypes', httpOptions);
  }
  /**
  * 
  */
  getAllRemarks(orderId: string) {
    const httpOptions = this.setHttpOptions();
    return this.http.get(this.serviceURI + `/getAllRemarks?orderid=${orderId}`, httpOptions);
  }
  /**
  * 
  */
  getOrderSummary(orderId: string) {
    const httpOptions = this.setHttpOptions();
    return this.http.get(this.serviceURI + `/getOrderSummary?orderid=${orderId}`, httpOptions);
  }
  /**
   * 
   */
  getTotalSalereport(startDate: any, endDate: any, reportType: any, country: any, userType: any, user: any, boxID?: any, orderStatus?: any) {
    const httpOptions = this.setHttpOptions();
    if (user.length === 0) {
      user = localStorage.getItem('user');
    }
    if (!!boxID == false) {
      boxID = "";
    }

    if (!!orderStatus == false) {
      orderStatus = "";
    }
    return this.http.get(this.serviceURI + `/getTotalSalesReport?start_date=${startDate}&end_date=${endDate}&reportType=${reportType}&reportUser=${user}&country=${country}&userType=${userType}&boxID=${boxID}&order_status=${orderStatus}`, httpOptions);
  }
  /**
  * 
  */
   getCustomerDetails() {
    const httpOptions = this.setHttpOptions();
    return this.http.get(this.serviceURI + `/getAllCustomers`, httpOptions);
  }
  /**
   * 
   * @returns 
   */
  updateDiscount(orderID: string, discountData: any) {
    const httpOptions = this.setHttpOptions();
    return this.http.post(this.serviceURI + `/updateDeliveryCharges?orderId=${orderID}`, discountData,
     httpOptions);
 
  }
  /**
   * 
   */
  setHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
        'x-access-token': this._auth.getToken()
      })
    };
  }
  /**
   * One Fab httpotions
   */
   setFabOneHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._auth.getOneFabtoken()}`,
        'Access-Control-Allow-origin': '*',
        'Access-Control-Allow-credentials': 'true'
      })
    };
  }
  /**
   * One Fab
   */
  /**
   * Method to authenticate One Fab API
   */
  authenticateFabOne() {
    const userName = "ss.shahabas@gmail.com";
    const password = "fbl~1}RwvFcQ";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': '*',
        'Access-Control-Allow-credentials': 'true'

      })
    }
    return this.http.get(`${CONFIG.fab_one_uri}/client-oauth?client_id=${CONFIG.client_id}&client_secret=${CONFIG.client_secret}&username=${userName}&password=${password}`, httpOptions);
  }
}
