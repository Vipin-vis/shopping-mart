import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user:string = "Vipin";
  listItems = APP_CONSTANTS.sideNavItems;
  constructor() { }
  ngOnInit(): void {
  }

}

