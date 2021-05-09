import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-packing-manifest',
  templateUrl: './packing-manifest.component.html',
  styleUrls: ['./packing-manifest.component.scss']
})
export class PackingManifestComponent implements OnInit {

  displayedColumns = ['slno', 'bookedon', 'orderNo', 'customerName', 'address', 'boxId'];

  packingDetails: any = [];

  constructor() { }

  ngOnInit(): void {
    //Dummy Data
    this.packingDetails = [
      {
        index : 1,
        booking_date: "08/05/2021",
        order_number: "order_sjdhbfjebfkjbwee4612856348524856284AQQQQQQQQQQQQQ",
        customer_name: "Arnold",
        address: "sdkjfbksjf  sdvgsedfvb dsafsdgv dsfgwseg wefweafQQQQQQQQVVWQE  QW EDQWED WQEDWQ ",
        box_id: "BOX_US_12345"
      }
    ]
  }



}
