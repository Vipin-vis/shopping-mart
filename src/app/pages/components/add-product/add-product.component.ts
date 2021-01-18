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
    product_name: "",
    product_category: "",
    product_price: "",
    product_description: ""
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
      product_name: "",
      product_category: "",
      product_price: "",
      product_description: ""
    };
  }
  /**
   * 
   */
  addProduct() {
    const param =  this.product;
    this._http.addProduct(param).subscribe((res) => {
      console.log("Saved Successfully", res);
      this._sharedService.openSnackBar("Product added successfully!!");
      this.cancel();
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
