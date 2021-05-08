import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

  dataSource: any = [
    {
      orders: 0,
      cost: 0
    }];

  startDateVal: any = null;
  endDateVal: any = null;
  startDat: string = "";
  endDat: string = "";
  displayedColumns: string[] = ['orders', 'cost'];
  user: any = "";
  isUser: boolean = false;
  userType: string = "";

  constructor(private _http: HttpService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.user=localStorage.getItem('user');
    this.user = this.route.snapshot.queryParams['user'];
    let reportType = this.route.snapshot.queryParams['report_type'];
    const startDate = this.route.snapshot.queryParams['start_date'];
    let country = this.route.snapshot.queryParams['country'];
    this.userType = this.route.snapshot.queryParams['userType'];
    if (!!country == false) {
      country = "";
    }
    if (!!this.userType == false) {
      this.userType = "";
      this.isUser = true;
    }
    if (!!this.user == false) {
      this.user = "";
    }
    if (!!reportType == false) {
      reportType = "";
    }
    const startDateObj = new Date(parseInt(startDate));
    //this.startDateVal = `${startDateObj.getDate()}-${startDateObj.getMonth()}-${startDateObj.getFullYear()}`;
    let smonth: any = String(startDateObj.getMonth() + 1).padStart(2, '0')
    let sdate: any = String(startDateObj.getDate()).padStart(2, '0')
    this.startDateVal = `${startDateObj.getFullYear()}-${smonth}-${sdate} 0:0:1`;
    this.startDat = this.startDateVal.split(" ")[0];
    const endDate = this.route.snapshot.queryParams['end_date'];
    const endDateObj = new Date(parseInt(endDate));
    let emonth: any = String(endDateObj.getMonth() + 1).padStart(2, '0')
    let edate: any = String(endDateObj.getDate()).padStart(2, '0')
    this.endDateVal = `${endDateObj.getFullYear()}-${emonth}-${edate} 23:59:59`;
    this.endDat = this.endDateVal.split(" ")[0];
    this._http.getTotalSalereport(this.startDateVal, this.endDateVal, reportType, country, this.userType, this.user).subscribe((res: any) => {
      this.dataSource[0].cost = JSON.parse(JSON.stringify(res)).cost;
      this.dataSource[0].orders = JSON.parse(JSON.stringify(res)).orders;
      this.user = JSON.parse(JSON.stringify(res)).user;
    },
      (err) => {
        console.log("ERROR: ", err);
      })
  }

  captureScreen() {
    document.title = "fabone_sales_report";
    window.print();
  }

}
