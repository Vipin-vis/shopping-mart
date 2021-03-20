import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-shipping-charge',
  templateUrl: './shipping-charge.component.html',
  styleUrls: ['./shipping-charge.component.scss']
})
export class ShippingChargeComponent implements OnInit {

  expressCharge: number = 0;
  normalCharge: number = 0;
  shippingTypes: any = [];
  shippingTypeCharge: any = [];

  constructor(private _http: HttpService,
    private _sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.shippingTypes = [];
    this.shippingTypeCharge = [];
    this._http.getShippingTypes().subscribe((res) => {
      this.shippingTypeCharge = JSON.parse(JSON.stringify(res));
    });

    //To remove:
    //this.shippingTypes = ["as","sdsd", "wsadsfd","sfsf", "sfsf", "sfsf"];
    // this.shippingTypes.forEach((type: any) => {
    //   this.shippingTypeCharge.push({
    //     "name": type,
    //     "cost": ""
    //   })
    // });

  }
  /**
   * 
   */
  saveCharge() {
    let shippingCharge: any = {
      "user_name": this._sharedService.username,
      "shipping": []
    }

    this.shippingTypeCharge.forEach((type: any) => {
      shippingCharge['shipping'].push({
        "name": type.name,
        "cost": type.cost
      })
    });
    this._http.updateShipppingCharge(shippingCharge).subscribe((res: any) => {
      this._sharedService.openSnackBar("Shipping Charge Updated Successfully!!");
    }, (err: any) => {
      console.error(err);
    })
  }
  /**
   * 
   */
  cancel() {
    this.expressCharge = 0;
    this.normalCharge = 0;
  }

}
