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

  constructor(private _http: HttpService,
    private _sharedService: SharedService) { }

  ngOnInit(): void {
  }
  /**
   * 
   */
  saveCharge() {
    let shippingCharge = {
      "user_name": this._sharedService.loggedUser,
      "express": this.expressCharge,
      "normal": this.normalCharge
    }

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
