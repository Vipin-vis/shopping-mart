import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CONFIG } from 'src/app/config/config';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  serviceURI: string = CONFIG.api_service_uri;
  constructor(private http: HttpClient) {

  }

  getProducts(searchKey: string): Observable<any> {
    return this.http.get(this.serviceURI + '/products', httpOptions);
  }

  getAllOrders(): Observable<any> {
    return this.http.get(this.serviceURI + 'getallorders');
  }

}
