import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-packing-manifest',
  templateUrl: './packing-manifest.component.html',
  styleUrls: ['./packing-manifest.component.scss']
})
export class PackingManifestComponent implements OnInit {

  displayedColumns = ['slno', 'bookedon', 'orderNo', 'customerName', 'address', 'boxId'];

  packingDetails: any = [];
  boxID: any = "";
  orderStatus: any = "";
  country: any = "";
  reportType: any = "";
  isBoxid: boolean = false;
  isCountry: boolean = false;
  isOrderStatus: boolean = false;
  userTotalSalesDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  startDateVal: any = null;
  endDateVal: any = null;
  startDat: string = "";
  endDat: string = "";
  toPrint:boolean = true;

  constructor(private _http: HttpService,
    private route: ActivatedRoute,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    let startDate: any = this.route.snapshot.paramMap.get('startDate');
    const startDateObj: any = new Date(parseInt(startDate));
    let smonth: any = String(startDateObj.getMonth() + 1).padStart(2, '0')
    let sdate: any = String(startDateObj.getDate()).padStart(2, '0')
    this.startDateVal = `${startDateObj.getFullYear()}-${smonth}-${sdate} 0:0:1`;
    this.startDat = this.startDateVal.split(" ")[0];
    const endDate: any = this.route.snapshot.paramMap.get('endDate');
    const endDateObj = new Date(parseInt(endDate));
    let emonth: any = String(endDateObj.getMonth() + 1).padStart(2, '0')
    let edate: any = String(endDateObj.getDate()).padStart(2, '0')
    this.endDateVal = `${endDateObj.getFullYear()}-${emonth}-${edate} 23:59:59`;
    this.endDat = this.endDateVal.split(" ")[0];
    const userType = this._auth.getUserTypeFromLs();
    this.isBoxid = false;
    this.isCountry = false;
    this.boxID = this.route.snapshot.paramMap.get('boxid');
    this.orderStatus = this.route.snapshot.paramMap.get('orderStatus');

    if (!!this.boxID == false) {
      this.boxID = "";
    }
    this.country = this.route.snapshot.paramMap.get('country');
    if (!!this.country == false) {
      this.country = "";
    }
    this.reportType = this.route.snapshot.paramMap.get('report_type');
    if (!!this.reportType == false) {
      this.reportType = "";
    } else if (this.reportType == "boxidSalesReport") {
      this.displayedColumns = ['slno', 'bookedon', 'orderNo', 'customerName', 'address', 'cargo'];
      this.isBoxid = true;
      this.startDateVal = "1-1-2021";
      this.endDateVal = "1-1-2021";
    } else if (this.reportType == "countrySalesReport") {
      this.displayedColumns = ['slno', 'bookedon', 'orderNo', 'customerName', 'address', 'boxId', 'cargo'];
      this.isCountry = true;
    }
    if (!!this.orderStatus == false) {
      this.orderStatus = "";
    } else {
      this.displayedColumns = ['slno', 'bookedon', 'orderNo', 'customerName', 'address', 'boxId', 'cargo'];
      this.isOrderStatus =  true;
    }
    this._http.getTotalSalereport(this.startDateVal, this.endDateVal, this.reportType, this.country, userType, "", this.boxID, this.orderStatus).subscribe((res: any) => {
      if (this.reportType == "boxidSalesReport") {
        this.packingDetails = JSON.parse(JSON.stringify(res)).boxDetails;
      } else if (this.reportType == "countrySalesReport") {
        this.packingDetails = JSON.parse(JSON.stringify(res)).countryDetails;
      } else {
        this.packingDetails = JSON.parse(JSON.stringify(res)).packingDetails;
      }
      this.packingDetails.forEach((packing: any, index: any) => {
        packing.index = index + 1;
      });
    },
      (err) => {
        console.log("ERROR: ", err);
      })

  }

  captureScreen() {
    this.toPrint=false;
    document.title = "fabone_packing_report";
    setTimeout(() => {
      window.print();
      this.toPrint=true;
    }, 1000);
  }

}
