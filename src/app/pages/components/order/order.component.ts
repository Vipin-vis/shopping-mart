import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orders, Product } from 'src/app/core/data/dummyData';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { ConfirmDialogModel, ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];
  orders: any = Orders;
  displayPayment: boolean = true;
  displayOrderStatus = true;
  displayDeleteOrder = true;
  remarks: string = "";

  constructor(private _sharedService: SharedService,
    private _http: HttpService,
    public dialog: MatDialog) {
    let userType: string = this._sharedService.userTypeValue;
    // this.orders = Orders;

    if (userType === "admin") {
      this.displayPayment = true;
      this.displayOrderStatus = true;
      this.displayDeleteOrder = true;
    } else if (userType === "agent") {
      this.displayPayment = false;
      this.displayOrderStatus = false;
      this.displayDeleteOrder = true;
    }
    else if (userType === "accountant") {
      this.displayPayment = true;
      this.displayOrderStatus = true;
      this.displayDeleteOrder = false;
    }

  }

  products: any[] = [];

  getOrderData(): void {
    this._http.getAllOrders().subscribe((res: any) => {
      this.orders = res['order'];
      this.orders.forEach((order: any) => {
        order.products = [];
      });
    })

  }

  /** Gets the total cost of all Products. */
  getTotalCost(product: any) {
    return product.map((prod: any) => prod.prod_price * prod.prod_quantity).reduce((acc: any, value: any) => acc + value, 0);
  }

  ngOnInit(): void {
    this.getOrderData();
  }

  getProduct(oderID: any) {
    return Product.filter(prod => prod.id === oderID)
  }

  openPanel(id: string) {
    this.orders.forEach((order: any) => {
      if (order.order_id === id) {
        this._http.getOrderDetails(id).subscribe((res: any) => {


          //order.products = { ...res['order_product_data'] }
          order.products = JSON.parse(JSON.stringify(res['order_product_data']));
          order.products['customer_name'] = JSON.parse(res['order_customer_data'])['cus_name'];
        })
      }
    });
  }
  /**
   * 
   */
  deleteOrder(id: string) {

    const message = `Are you sure you want to delete this Order?`;

    const dialogData = new ConfirmDialogModel("Confirm Delete", message);

    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      maxWidth: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this._http.deleteOrder(id).subscribe((res) => {
          this.getOrderData();
          this._sharedService.openSnackBar("Order Deleted Successfully!!");
        }, (er) => {
          console.log("Error:", er);
        })
      } else {
        return;
      }
    });
  }


  /**
   * 
   */
  onChangePayment(order: any) {
    let paymentStatus = {
      "user_name": this._sharedService.loggedUser,
      "usertype": this._sharedService.userTypeValue,
      "order_id": order.order_id,
      "payment_status": order.payment_status
    }
    this._http.changePaymentStatus(paymentStatus).subscribe((res: any) => {
      console.log("Payment Status updated");
    })
  }

  /**
   * 
   */
  onChangeOrder(order: any) {
    let orderStatus = {
      "user_name": this._sharedService.loggedUser,
      "usertype": this._sharedService.userTypeValue,
      "order_id": order.order_id,
      "order_status": order.order_status
    }
    this._http.changeOrderStatus(orderStatus).subscribe((res: any) => {
      console.log("Order Status updated");
    })
  }
  /**
   * 
   * @param order 
   */
  saveChanges(order: any) {
    this._http.editOrder(order).subscribe((res: any) => {
      this._sharedService.openSnackBar("Order edited successfully!!");
    }, (err: any) => {
      console.error(err);
    })
  }
  /**
   * 
   */
  openRemarkPopup(orderId: string) {

    let remarksData = [];
    this._http.getAllRemarks(orderId).subscribe((res: any) => {
      remarksData = JSON.parse(JSON.stringify(res));
      const dialogRef = this.dialog.open(orderRemarksComponent, {
        width: '700px',
        data: { "orderId": orderId, "data": remarksData }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    })

  }
  /**
   * 
   */
  addFromCart(id: string) {
    this.orders.forEach((order: any) => {
      if (order.order_id === id) {
        order.products.concact(this._sharedService.cartData);
      }
    });
  }

  /**
   * 
   */
  removeItemFromOrder(id: any) {
    let indexToDel = -1;
    this.orders.forEach((order: any) => {
      if (order.order_id === id) {
        order.products.forEach((prod: any, index: number) => {
          if (prod.id === id) {
            indexToDel = index;
          }
        });
        if (indexToDel > -1) {
          order.products.splice(indexToDel, 1);
          return;
        }
      }
    });

  }
  
  /**
   * 
   */
  goToInvoice(orderid: string) {
    window.open('/invoice', "_blank");
  }
}

/**
 * 
 */
@Component({
  selector: 'order-remarks-dialog',
  templateUrl: 'order-remarks.component.html',
})
export class orderRemarksComponent {
  remarksText: string = "";
  constructor(
    public dialogRef: MatDialogRef<orderRemarksComponent>,
    @Inject(MAT_DIALOG_DATA) public remarks: any,
    private _sharedService: SharedService,
    private _http: HttpService) { }

  close(): void {
    this.dialogRef.close();
  }

  /**
   * 
   */
  addRemarks() {
    if (this.remarksText.trim().length === 0) {
      this._sharedService.openSnackBar("Please enter your remarks!!");
      return;
    }
    let remarks = {
      "user_name": this._sharedService.loggedUser,
      "user_type": this._sharedService.userTypeValue,
      "remarks": this.remarksText,
      "order_id": this.remarks.orderId
    }

    this._http.addRemarks(remarks).subscribe((res: any) => {
      this._sharedService.openSnackBar("Remarks added Successfully!!");
      this.close();
    }, (err: any) => {
      console.log(err);
    })
  }

}
