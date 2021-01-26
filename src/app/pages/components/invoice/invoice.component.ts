import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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

  constructor() { }

  ngOnInit(): void {
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
