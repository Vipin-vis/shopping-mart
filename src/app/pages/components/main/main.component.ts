import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user:string = "Vipin";
  listItems = ["Home","Order", "Category", "Cart", "Settings"];
  constructor() { }
  ngOnInit(): void {
  }

}
