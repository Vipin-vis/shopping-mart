import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-packing-manifest',
  templateUrl: './packing-manifest.component.html',
  styleUrls: ['./packing-manifest.component.scss']
})
export class PackingManifestComponent implements OnInit {

  displayedColumns = ['slno', 'bookedon', 'orderNo', 'customerName', 'address', 'boxId'];

  packingDetails: any = [];

  userTotalSalesDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  startDateVal: any = null;
  endDateVal: any = null;
  startDat: string = "";
  endDat: string = "";

  constructor(private _http: HttpService,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    let startDate:any = this.route.snapshot.paramMap.get('startDate');
    const startDateObj:any = new Date(parseInt(startDate));
    let smonth: any = String(startDateObj.getMonth() + 1).padStart(2, '0')
    let sdate: any = String(startDateObj.getDate()).padStart(2, '0')
    this.startDateVal = `${startDateObj.getFullYear()}-${smonth}-${sdate} 0:0:1`;
    this.startDat = this.startDateVal.split(" ")[0];
    const endDate:any =  this.route.snapshot.paramMap.get('endDate');
    const endDateObj = new Date(parseInt(endDate));
    let emonth: any = String(endDateObj.getMonth() + 1).padStart(2, '0')
    let edate: any = String(endDateObj.getDate()).padStart(2, '0')
    this.endDateVal = `${endDateObj.getFullYear()}-${emonth}-${edate} 23:59:59`;
    this.endDat = this.endDateVal.split(" ")[0];
    const user = 
    this._http.getTotalSalereport(this.startDateVal, this.endDateVal, "packingManifest", "", "", "").subscribe((res: any) => {
      this.packingDetails = JSON.parse(JSON.stringify(res)).packingDetails;
      this.packingDetails.forEach((packing:any, index:any) => {
        packing.index = index;
      });
    },
      (err) => {
        console.log("ERROR: ", err);
      })
    
  }

  captureScreen() {
    document.title = "fabone_packing_report";
    window.print();
  }

}
