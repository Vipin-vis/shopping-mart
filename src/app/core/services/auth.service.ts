import { OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 

  }

  autheticated: boolean = false;

  setToken(token: any) {
    localStorage.setItem("authToken", token);
  }

  getToken() {
    let token: any = "";
    token = localStorage.getItem("authToken")?.toString();
    return token;
  }

  setUserTypeToLs(userType: string) {
    localStorage.setItem("userType", userType);
  }
  setUserToLs(user: string) {
    localStorage.setItem("user", user);
  }
  setIsauthcatedToLs(auth: string) {
    localStorage.setItem("isAuthenticated", auth);
  }

  getIsauthcatedLs() {
    let auth: any = "";
    auth = localStorage.getItem("isAuthenticated")?.toString();
    return auth;
  }
  getUserTypeFromLs() {
    let type: any = "";
    type = localStorage.getItem("userType")?.toString();
    return type;
  }
  getUserFromLs() {
    let user: any = "";
    user = localStorage.getItem("user")?.toString();
    return user;
  }

  logOut() {
    localStorage.clear();
    this.autheticated = false;
  }

  isAuthenticated() {
    let auth = (this.getIsauthcatedLs() == 'true');
    return auth;
  }
}
