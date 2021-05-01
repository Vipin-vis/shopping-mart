import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-packing-panel',
  templateUrl: './packing-panel.component.html',
  styleUrls: ['./packing-panel.component.scss']
})
export class PackingPanelComponent implements OnInit {

  totalSalesDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private _sharedService: SharedService) { }

  ngOnInit(): void {
  }

  getReport(type: string) {
    let startDate = (new Date(this.totalSalesDateRange.controls['start'].value)).getTime();
    let endDate = (new Date(this.totalSalesDateRange.controls['end'].value)).getTime();
    let user = localStorage.getItem('user');
    if (!!startDate == false || !!endDate == false) {
      this._sharedService.openSnackBar("Please enter all required values!");
      return;
    }
    window.open(`/totalSalesReport?start_date=${startDate}&end_date=${endDate}&report_type=employeeSalesReport&user=${user}`, "_blank");
  }

}
