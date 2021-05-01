import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { APP_CONSTANTS } from 'src/app/core/constants/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  totalSalesDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  userTotalSalesDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  userTypeTotalSalesDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  userReportUser: string = "";
  users: any;
  userTypes: any;
  userTypeReportType: string = "";
  constructor(
    private _sharedService: SharedService,
    private _http: HttpService
  ) {
  }
  ngOnInit(): void {
    this._http.getAllUSers().subscribe((res) => {
      this.users = JSON.parse(JSON.stringify(res));
    })
    // this._http.getUserTypes().subscribe((res) => {
    //   this.userTypes = JSON.parse(JSON.stringify(res));
    // })
    this.userTypes = APP_CONSTANTS.userTypes;
  }

  getReport(type: string) {
    let startDate: any;
    let endDate: any;
    switch (type) {
      case 'totalSales':
        {
          startDate = (new Date(this.totalSalesDateRange.controls['start'].value)).getTime();
          endDate = (new Date(this.totalSalesDateRange.controls['end'].value)).getTime();
          if (!!startDate == false || !!endDate == false) {
            this._sharedService.openSnackBar("Please enter all required values!");
            return;
          }
          window.open(`/totalSalesReport?start_date=${startDate}&end_date=${endDate}`, "_blank");
          break;
        }
      case 'userTotalSales':
        {
          startDate = (new Date(this.userTotalSalesDateRange.controls['start'].value)).getTime();
          endDate = (new Date(this.userTotalSalesDateRange.controls['end'].value)).getTime();
          if (!!startDate == false || !!endDate == false) {
            this._sharedService.openSnackBar("Please enter all required values!");
            return;
          }
          window.open(`/totalSalesReport?start_date=${startDate}&end_date=${endDate}&report_type=employeeSalesReport&user=${this.userReportUser}`, "_blank");
          break;
        }
      case 'userTypeTotalSales':
        {
          startDate = (new Date(this.userTotalSalesDateRange.controls['start'].value)).getTime();
          endDate = (new Date(this.userTotalSalesDateRange.controls['end'].value)).getTime();
          if (!!startDate == false || !!endDate == false) {
            this._sharedService.openSnackBar("Please enter all required values!");
            return;
          }
          window.open(`/totalSalesReport?start_date=${startDate}&end_date=${endDate}&type=${type}&userType=${this.userTypeReportType}`, "_blank");
          break;
        }
      default:
        break;
    }

  }

}
