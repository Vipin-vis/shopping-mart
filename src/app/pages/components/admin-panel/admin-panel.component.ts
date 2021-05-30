import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ALL_COUNTRIES, APP_CONSTANTS } from 'src/app/core/constants/constants';
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
  boxIDTotalSalesDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  countrySalesDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  orderStatusSalesDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  userReportUser: string = "";
  users: any;
  userTypes: any;
  userTypeReportType: string = "";
  reportBoxID: string = "";
  allCountries: any = ALL_COUNTRIES;
  selectedCountry: string = "";
  selectedOrderStatus: string = "";

  constructor(
    private _sharedService: SharedService,
    private _http: HttpService,
    private router: Router
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
          window.open(`/totalSalesReport?start_date=${startDate}&end_date=${endDate}&report_type=totalSalesReport`, "_blank");
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
      case 'employeeTypeSalesReport':
        {
          startDate = (new Date(this.userTypeTotalSalesDateRange.controls['start'].value)).getTime();
          endDate = (new Date(this.userTypeTotalSalesDateRange.controls['end'].value)).getTime();
          if (!!startDate == false || !!endDate == false) {
            this._sharedService.openSnackBar("Please enter all required values!");
            return;
          }
          window.open(`/totalSalesReport?start_date=${startDate}&end_date=${endDate}&type=${type}&report_type=employeeTypeSalesReport&userType=${this.userTypeReportType}`, "_blank");
          break;
        }

      case 'orderStatusReport':
        {
          startDate = (new Date(this.orderStatusSalesDateRange.controls['start'].value)).getTime();
          endDate = (new Date(this.orderStatusSalesDateRange.controls['end'].value)).getTime();
          if (!!startDate == false || !!endDate == false || this.selectedOrderStatus == "") {
            this._sharedService.openSnackBar("Please enter all required values!");
            return;
          }
          this.router.navigate(['/packing-manifest', { startDate: startDate, endDate: startDate, report_type: "orderStatusReport", boxid: this.reportBoxID, orderStatus: this.selectedOrderStatus }]);
          break;
        }
      case 'boxIDTotalSales':
        {
          // window.open(`/totalSalesReport?start_date=${startDate}&end_date=${endDate}&type=${type}&report_type=boxidSalesReport&boxid=${this.reportBoxID}`, "_blank");
          this.router.navigate(['/packing-manifest', { startDate: "", endDate: "", report_type: "boxidSalesReport", boxid: this.reportBoxID }]);
          break;
        }
      case 'countrySales':
        {
          startDate = (new Date(this.countrySalesDateRange.controls['start'].value)).getTime();
          endDate = (new Date(this.countrySalesDateRange.controls['end'].value)).getTime();
          if (!!startDate == false || !!endDate == false) {
            this._sharedService.openSnackBar("Please enter all required values!");
            return;
          }
          // window.open(`/totalSalesReport?start_date=${startDate}&end_date=${endDate}&type=${type}&report_type=countrySalesReport&country=${this.selectedCountry}`, "_blank");
          this.router.navigate(['/packing-manifest', { startDate: startDate, endDate: endDate, report_type: "countrySalesReport", country: this.selectedCountry }]);
          break;
        }
      default:
        break;
    }

  }

}
