import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userType = new Subject();
  userTypeValue: string;
  loggedUser: string;
  cartData: any = [];
  cartDataLength = new Subject();
  username: string = "";
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar, private _auth: AuthService) {
    this.userTypeValue = "";
    this.loggedUser = "";
    if(!!this._auth.getUserTypeFromLs()) {
      this.setUserType(this._auth.getUserTypeFromLs());
    }
    if(!!this._auth.getUserFromLs()) {
      this.username = this.loggedUser = this._auth.getUserFromLs();
    }
  }

  setCartData(cartData: any) {
    let addQty:boolean= false;
    if (cartData.qty==0){
      this.openSnackBar("Please add atleast one quantity!");
      return;
    }
    this.cartData.forEach((data: any) => {
      if (data.id == cartData.id) {
        data.qty += cartData.qty;
        this.setcartDataLength(this.cartData.length);
        addQty=true;
      }
    });
    if (addQty){
      this.openSnackBar("Product added!");
      return;
    }
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
  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 3000,
      panelClass: ['snackbar-style'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
