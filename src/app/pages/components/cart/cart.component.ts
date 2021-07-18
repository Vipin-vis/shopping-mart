import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { ConfirmDialogModel, ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

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
  contactNumber: string = "";
  presenters: any = [];
  selectedPresenter: string = "";

  constructor(private _sharedService: SharedService,
    private changeDetectorRefs: ChangeDetectorRef,
    private _http: HttpService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this._http.getAllPreseters().subscribe((res: any) => {
      this.presenters = JSON.parse(JSON.stringify(res.presenter_info))
    });
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
    const phoneno = /^\d+$/;
    if (this.contactNumber.length == 0 || !(this.contactNumber.match(phoneno))) {
      this._sharedService.openSnackBar("Please enter valid contact number");
      return;
    }
    if (this.products.length == 0) {
      this._sharedService.openSnackBar("Cart is empty");
      return;
    }
    if (this.selectedPresenter.length == 0) {
      this._sharedService.openSnackBar("Please select presenter");
      return;
    }
    let orderProductData: any = [];
    this.products.forEach((product: any) => {
      let productData = {
        "prod_quantity": product.qty,
        "prod_id": product.id,
        "presenter": this.selectedPresenter
      }
      orderProductData.push(productData);
    });

    this._http.generateOrder(this._sharedService.loggedUser, orderProductData, this.remarks, this.selectedPresenter, this.contactNumber)
      .subscribe((res: any) => {
        if (!!res["order_link"]) {
          this._sharedService.openSnackBar("Order added successfully!!");
          this.orderLink = res["order_link"];
          this.goToPage(this.orderLink);
        }
      },
        (er) => {
          console.log("Error:", er);
        })
  }
  /**
   * 
   */
  clearCart() {
    const message = `Are you sure you want clear all items from cart?`;

    const dialogData = new ConfirmDialogModel("Confirm Clear Cart", message);

    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      maxWidth: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this._sharedService.clearCart();
        this.products = [];
      } else {
        return;
      }
    });
  }
  /**
   * 
   */
  goToPage(url: string) {
    window.open(url);
  }

  /**
   * 
   */
  openSnackBar() {
    if (this.orderLink.length != 0) {
      this._sharedService.openSnackBar("Order Link Copied");
    }
  }

}

export interface Product {
  item: string;
  cost: number;
  qty: number;
  category: string;
  descp?: string;
}
