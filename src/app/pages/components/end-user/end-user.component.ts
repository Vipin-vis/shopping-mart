import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';
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
  products: any = [];

  userDetails: any = {
    username: "",
    customer_name: "",
    customer_email_id: "",
    customer_billing_address: "",
    customer_shipping_address: "",
    customer_contact: "",
    delivery_mode: "",
    cus_id: "",
    order_id: "",
  };
  userAdded: boolean = false;

  constructor(private _http: HttpService,
    private route: ActivatedRoute, private _sharedservice: SharedService) {
    this.orderID = "";
    //this.products =[];
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const orderID = (urlParams.get('order_id'))?.toString();
    const cust_id = (urlParams.get('cust_id'))?.toString();
    this._http.getUserOrderDetails(cust_id, orderID).subscribe((res: any) => {
      this.products = JSON.parse(JSON.stringify(res['order_product_data']));
      console.log(this.products)
    })
  }
  /** Gets the total cost of all Products. */
  getTotalCost() {
    return this.products.map((prod: any) => prod.prod_price * prod.prod_quantity).reduce((acc: any, value: any) => acc + value, 0);
  }
/**
   *  
   */
  saveUserDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('cus_id');
    const orderID = urlParams.get('order_id');
    this.userDetails['username'] = myParam;
    this.userDetails['cus_id'] = myParam;
    this.userDetails['order_id'] = orderID;
    this._http.saveUserDetails(this.userDetails).subscribe((res) => {
      console.log("Saved Successfully");
      this._sharedservice.openSnackBar("User details added and Order confirmed");
      this.userAdded = true;
    },
      (err) => {
        console.log("Error", err);
      });
  }

  captureScreen()  
  {  
    var data:any = document.getElementById('invoiceToPrint');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      const urlParams = new URLSearchParams(window.location.search);
      const orderID = urlParams.get('order_id');
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;   
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      var filename = 'fabone'+orderID+'.pdf';
      pdf.save(filename); // Generated PDF   
    });  
  }  
}
