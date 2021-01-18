import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: any = {
    prod_name: "",
    prod_category: "",
    prod_cost: "",
    prod_quantity: ""
  };
  newCategory: boolean = false;

  catergoriesList: any = [];

  constructor(private _http: HttpService,
    private _sharedService: SharedService) { }

  ngOnInit(): void {
    this._http.getproductCategory().subscribe((res: any) => {
      this.catergoriesList = { ...res }
    },
      (err) => {
        console.log("Error:", err);
      });
  }
  /**
   * 
   */
  cancel() {
    this.product = {
      prod_name: "",
      prod_category: "",
      prod_cost: "",
      prod_quantity: ""
    };
  }
  /**
   * 
   */
  addProduct() {
    const param = {
      "username": this._sharedService.loggedUser,
      "product_details": this.product
    }
    this._http.addProduct(param).subscribe((res) => {
      console.log("Saved Successfully", res)
    },
      (err) => {
        console.log("Error", err);
      });
  }
  /**
   * 
   */
  selectNewCategory(newCategory:boolean) {
    this.newCategory = newCategory;
  }
}
