import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-packing-panel',
  templateUrl: './packing-panel.component.html',
  styleUrls: ['./packing-panel.component.scss']
})
export class PackingPanelComponent implements OnInit {

  packingDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private _sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  getReport(type: string) {
    let startDate = (new Date(this.packingDateRange.controls['start'].value)).getTime();
    let endDate = (new Date(this.packingDateRange.controls['end'].value)).getTime();
    let user = localStorage.getItem('user');
    if (!!startDate == false || !!endDate == false) {
      this._sharedService.openSnackBar("Please enter all required values!");
      return;
    }
    this.router.navigate(['/packing-manifest', {startDate: startDate, endDate:endDate}]);
  }

}
