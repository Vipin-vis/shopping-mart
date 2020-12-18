import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userType:string;
  cartData:any= [];

  constructor() { 
    this.userType = "";
  }

  setCartData(cartData:any) {
    this.cartData.push(cartData);
  }
  removeItemFromCart(id:any) {
    let indexToDel = -1;
    this.cartData.forEach((prod:any, index:number) => {
      if(prod.id === id) {
        indexToDel = index;
      }
    });
    if (indexToDel > -1) {
      this.cartData.splice(indexToDel, 1);
      return true;
    }
    return false;
  }
  clearCart() {
    this.cartData = [];
  }
  setUserType(type:string) {
    this.userType = type;
  }

  getUserType():string {
    return this.userType;
  }
}
