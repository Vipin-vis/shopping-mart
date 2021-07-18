import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  toPrint: boolean = true;
  displayedColumns = ['slno', 'name', 'contact', 'email', 'address','shippingAddress'];

  customerDetails: any = [];
  constructor(private _http: HttpService) { }

  ngOnInit(): void {
    this._http.getCustomerDetails().subscribe((res) => {
      this.customerDetails = JSON.parse(JSON.stringify(res));
    });
  }

  /**
   * 
   */
  captureScreen() {
    window.print();
  }
}
