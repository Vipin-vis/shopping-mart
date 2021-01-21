import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/core/constants/constants';
import { Location } from "@angular/common";
import { SharedService } from 'src/app/core/services/shared.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user: string = "";
  listItems = APP_CONSTANTS.sideNavItems;
  route: string = "";
  cartLength: number;
  userType: string = "";
  constructor(location: Location,
    private router: Router,
    private _sharedService: SharedService,
    private _auth: AuthService,) {
    this.cartLength = 0;
    this.userType = this._sharedService.userTypeValue;
    this._sharedService.getcartDataLength().subscribe((len: any) => {
      this.cartLength = len;
    })
    this._sharedService.getUserType().subscribe((type: any) => {
      this.userType = type;
    })
    router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = location.path();
      } else {
        this.route = "/home";
      }
      this.user = this._sharedService.username;
    });
  }


  ngOnInit() {
  }

  logOut() {
    this._auth.logOut();
    this.router.navigate(['/login']);
  }

}

