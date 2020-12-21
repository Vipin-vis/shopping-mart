import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userType = new Subject();
  userTypeValue: string;
  cartData: any = [];
  cartDataLength = new Subject();

  constructor() {
    this.userTypeValue = "";
  }

  setCartData(cartData: any) {
    this.cartData.push(cartData);
    this.setcartDataLength(this.cartData.length);
  }
  removeItemFromCart(id: any) {
    let indexToDel = -1;
    this.cartData.forEach((prod: any, index: number) => {
      if (prod.id === id) {
        indexToDel = index;
      }
    });
    if (indexToDel > -1) {
      this.cartData.splice(indexToDel, 1);
      this.setcartDataLength(this.cartData.length);
      return true;
    }
    return false;
  }
  clearCart() {
    this.cartData = [];
    this.setcartDataLength(this.cartData.length);
  }
  setcartDataLength(len: number) {
    this.cartDataLength.next(len);
  }

  getcartDataLength() {
    return this.cartDataLength.asObservable();
  }

  setUserType(type: string) {
    this.userType.next(type);
    this.userTypeValue = type;
  }

  getUserType() {
    return this.userType.asObservable();
  }

  getUserTypeValue() {

  }
}
