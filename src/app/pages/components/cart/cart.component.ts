import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];

  products: Product[] = JSON.parse(JSON.stringify(this._sharedService.cartData));

  remarks: string = "";
  orderLink: string = "";
  presenters: any = [];

  constructor(private _sharedService: SharedService,
    private changeDetectorRefs: ChangeDetectorRef,
    private _http: HttpService) { }

  ngOnInit(): void {
    this._http.getAllPreseters().subscribe((res) => {
      // this.presenters = { ...res };

    });
    //To-DO: to remove
    this.presenters = [
      {
        'user_name': "babu"
      },
      {
        'user_name': "Sasi"
      },
      {
        'user_name': "Soman"
      }
    ]

  }

  /** Gets the total cost of all Products. */
  getTotalCost() {
    return this.products.map(prod => prod.cost * prod.qty).reduce((acc, value) => acc + value, 0);
  }

  /**
   * 
   */
  gotoProductSearch() {

  }

  removeItem(id: any) {
    if (this._sharedService.removeItemFromCart(id)) {
      this.products = JSON.parse(JSON.stringify(this._sharedService.cartData));
      // this.changeDetectorRefs.detectChanges();
    }
  }
  /**
   * 
   */
  generateOrder() {
    let orderProductData: any = [];
    this.products.forEach((product: any) => {
      let productData = {
        "prod_quantity": product.qty,
        "prod_id": product.prod_id
      }
      orderProductData.push(productData);
    });

    this._http.generateOrder(this._sharedService.loggedUser, orderProductData, this.remarks)
      .subscribe((res: any) => {
        if (!!res["order_link"]) {
          this.orderLink = res["order_link"];
        }
      },
        (er) => {
          console.log("Error:", er);
        })
  }

}

export interface Product {
  item: string;
  cost: number;
  qty: number;
  category: string;
  descp?: string;
}
