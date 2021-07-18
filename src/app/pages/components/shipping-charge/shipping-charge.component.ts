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
  vatCharge: any = "5%";
  newDeliveryCharge: any = "";
  newDeliveryName: string = "";

  constructor(private _http: HttpService,
    private _sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.shippingTypes = [];
    this.shippingTypeCharge = [];
    this._http.getShippingTypes().subscribe((res) => {
      this.shippingTypeCharge = JSON.parse(JSON.stringify(res));
      //this.vatCharge = JSON.parse(JSON.stringify(res.vat))
    });

  }
  /**
   * 
   */
  saveCharge() {
    let shippingCharge: any = {
      "user_name": this._sharedService.username,
      "shipping": [],
      "vat": this.vatCharge
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
  AddNewDelivery() {
    if (this.newDeliveryName.trim().length < 1 ||
    this.newDeliveryCharge.trim().length < 1) {
      this._sharedService.openSnackBar("All Fields are required!!");
      return;
    }
    const newDeliveryType = {
      name: this.newDeliveryName,
      cost: this.newDeliveryCharge
    }
      this.shippingTypeCharge.push(newDeliveryType);
      this._sharedService.openSnackBar(`${this.newDeliveryName} added!!`);
      
  }
  /**
   * 
   */
  cancel() {
    this.expressCharge = 0;
    this.normalCharge = 0;
  }

}
