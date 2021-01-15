import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-end-user',
  templateUrl: './end-user.component.html',
  styleUrls: ['./end-user.component.scss']
})
export class EndUserComponent implements OnInit {
  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];

  orderID: string;
  products: any = [{ "prod_category": "TV", "prod_quantity": 2, "prod_id": "PRO5", "prod_price": 10000, "prod_description": "80 INC OLED", "prod_name": "LG TV" },
  { "prod_category": "MOBILE", "prod_quantity": 1, "prod_id": "PRO6", "prod_price": 40000, "prod_description": "APPLE FLAGSHIP", "prod_name": "IPHONE 12" }];

  userDetails: any = {
    username: "",
    customer_name: "",
    customer_email_id: "",
    customer_billing_address: "",
    customer_shipping_address: "",
    delivery_mode: "",
    cust_id: "",
    örder_id: "",
  };
userAdded: boolean = false;
  constructor(private _http: HttpService,
    private route: ActivatedRoute) {
    this.orderID = "";
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const orderID = (urlParams.get('order_id'))?.toString();
    const cust_id = (urlParams.get('cust_id'))?.toString();
    this._http.getUserOrderDetails(cust_id, orderID).subscribe((res: any) => {
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
    const orderID = urlParams.get('order_id');
    this.userDetails['username'] = myParam;
    this.userDetails['cust_id'] = myParam;
    this.userDetails['order_id'] = orderID;
    this.userAdded = true;
    this._http.saveUserDetails(this.userDetails).subscribe((res) => {
      console.log("Saved Successfully")
    },
      (err) => {
        console.log("Error", err);
      });
  }

  public captureScreen()  
  {  
    var data:any = document.getElementById('invoiceToPrint');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  
}
