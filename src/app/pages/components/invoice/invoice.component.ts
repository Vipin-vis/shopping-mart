import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpService } from 'src/app/core/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  products: any = [];
  userDetails: any = {};
  totalCost: number = 0;
  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];
  shipment: any = {
    mode: "Normal",
    cost: 0
  }
  toPrint:boolean=true;

  constructor(private _http: HttpService,
    private route: ActivatedRoute, ) { 
  }

  ngOnInit(): void {

  }
  /**
   * 
   */
  ngAfterViewInit():void{
    let orderID = this.route.snapshot.queryParams.order_id;
    let cust_id = this.route.snapshot.queryParams.cust_id;
    this._http.getUserOrderDetails(cust_id, orderID,'INVOICE').subscribe((res: any) => {
      this.products = JSON.parse(JSON.stringify(res['order_product_data']));   
      let userDetails:any = JSON.parse(JSON.stringify(res['order_customer_data']));
      this.userDetails.customer_shipping_address = userDetails.cust_billing_address;
      this.userDetails.customer_billing_address = userDetails.customer_shipping_adress;
      this.userDetails.delivery_mode = JSON.parse(JSON.stringify(res['delivery_mode']));
      this.userDetails.customer_email_id = userDetails.cust_email;
      this.userDetails.customer_name = userDetails.cus_name;
      this.userDetails.agent = JSON.parse(JSON.stringify(res['agent']));
               
      let shippingcharges:any =  JSON.parse(JSON.stringify(res['order_shipping_charges']));
      this.shipment.cost = parseInt(shippingcharges[this.userDetails.delivery_mode]);
      this.getTotalCost();
    })
  }
  /**
   * 
   */
   /** Gets the total cost of all Products. */
   getTotalCost() {
    let total = this.products.map((prod: any) => prod.prod_price * prod.prod_quantity).reduce((acc: any, value: any) => acc + value, 0);
    this.totalCost = total + this.shipment.cost;
  }
  /**
   * 
   */
  captureScreen() {
    this.toPrint=false
    const urlParams = new URLSearchParams(window.location.search);
    const orderID = urlParams.get('order_id');
    document.title= orderID?.toString()+'_INVOICE';
    setTimeout(() => {
      window.print();
      this.toPrint=true;
    }, 1000);
    
    return;
    let data: any = document.getElementById('invoiceToPrint');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 210;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      const urlParams = new URLSearchParams(window.location.search);
      const orderID = urlParams.get('order_id');
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      let filename = 'onefab' + orderID + '.pdf';
      pdf.save(filename); // Generated PDF   
    });
  }


}
