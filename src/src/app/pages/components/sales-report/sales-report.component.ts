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
      orders: 100,
      cost: 25000
    }
  ];
  startDateVal: any = null;
  endDateVal: any = null;

  displayedColumns: string[] = ['orders', 'cost'];

  constructor(private _http: HttpService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const startDate = this.route.snapshot.queryParams['start_date'];
    const startDateObj = new Date(parseInt(startDate));
    this.startDateVal = `${startDateObj.getDate()}-${startDateObj.getMonth()}-${startDateObj.getFullYear()}`;

    const endDate = this.route.snapshot.queryParams['end_date'];
    const endDateObj = new Date(parseInt(endDate));
    this.endDateVal = `${endDateObj.getDate()}-${endDateObj.getMonth()}-${endDateObj.getFullYear()}`;

    this._http.getTotalSalereport(startDateObj+"", endDateObj+"").subscribe((res: any) => {
      this.dataSource = JSON.parse(JSON.stringify(res));
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
