import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, private _sharedService: SharedService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    let activate: boolean = true;
    if ((expectedRole === 'admin-panel' || expectedRole === 'packing-panel'
      || expectedRole === 'cart' || expectedRole === 'users'
      || expectedRole === 'shippingCharge'
      || expectedRole === 'addproduct'
      || expectedRole == 'customer-details')
      && (this._sharedService.userTypeValue !== 'admin')) {
      activate = false;
    }
    if (expectedRole === 'packing-panel' && (this._sharedService.userTypeValue === 'packing')) {
      activate = true;
    }
    if (expectedRole === 'cart' && (this._sharedService.userTypeValue === 'agent')) {
      activate = true;
    }
    if (expectedRole === 'products' && (this._sharedService.userTypeValue !== 'packing')) {
      activate = true;
    }
    const token = localStorage.getItem('token');
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    } else if (!activate) {
      return false;
    }
    return true;
  }
}