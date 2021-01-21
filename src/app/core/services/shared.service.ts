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
  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 3000,
      panelClass: ['snackbar-style'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
