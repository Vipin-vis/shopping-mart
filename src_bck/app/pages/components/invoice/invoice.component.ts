import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/core/services/http.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

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

  constructor(private _http: HttpService,
    private route: ActivatedRoute ) { 

  }

  ngOnInit(): void {
    let orderID = this.route.snapshot.paramMap.get('order_id');
    let cust_id = this.route.snapshot.paramMap.get('cust_id');
    this._http.getUserOrderDetails(cust_id, orderID).subscribe((res: any) => {
      this.products = JSON.parse(JSON.stringify(res['order_product_data']));
      this.shipment.cost = JSON.parse(JSON.stringify(res['shipping_charge']));
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
