import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: any) {
    localStorage.setItem("authToken", token)
  }

  getToken() {
    let token: any = "";
    token = localStorage.getItem("authToken")?.toString();
    return token;
  }
}
