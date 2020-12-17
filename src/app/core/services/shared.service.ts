import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userType:string;

  constructor() { 
    this.userType = "";
  }

  setUserType(type:string) {
    this.userType = type;
  }

  getUserType():string {
    return this.userType;
  }
}
