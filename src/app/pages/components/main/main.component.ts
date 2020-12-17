import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/core/constants/constants';
import { Location } from "@angular/common";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user: string = "Vipin";
  listItems = APP_CONSTANTS.sideNavItems;
  route: string = "";
  constructor(location: Location, router: Router) {
    router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = location.path();
      } else {
        this.route = "/home";
      }
    });
  }


  ngOnInit() {
  }

}

