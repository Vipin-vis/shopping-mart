import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-end-user',
  templateUrl: './end-user.component.html',
  styleUrls: ['./end-user.component.scss']
})
export class EndUserComponent implements OnInit {
  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];

  orderID: string;
  products: any = [];

  userDetails: any = {
    username: "",
    customer_name: "",
    customer_email_id: "",
    customer_billing_address: "",
    customer_shipping_address: "",
    delivery_mode: "",
  };

  constructor(private _http: HttpService,
    private route: ActivatedRoute) {
    this.orderID = "";
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const orderID = (urlParams.get('order_id'))?.toString();
    this._http.getOrderDetails(orderID).subscribe((res: any) => {
      this.products = { ...res['order_product_data'] };
    })
  }
  /** Gets the total cost of all Products. */
  getTotalCost() {
    return this.products.map((prod: any) => prod.cost * prod.qty).reduce((acc: any, value: any) => acc + value, 0);
  }
  /**
   *  
   */
  saveUserDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('cus_id');
    this.userDetails['username'] = myParam;
    this._http.saveUserDetails(this.userDetails).subscribe((res) => {
      console.log("Saved Successfully")
    },
      (err) => {
        console.log("Error", err);
      });
  }
}
