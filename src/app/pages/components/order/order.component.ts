import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  scroll = new Subject<number>();
  showScrollTopButton: boolean;
  displayedColumns = ['item', 'category', 'quantity', 'presenter', 'cost', 'tCost'];
  orders: any = [];
  displayPayment: boolean = false;
  displayOrderStatus = true;
  displayDeleteOrder = true;
  remarks: string = "";
  currentCustId: string = "";
  orderIDFilter: string = "";
  boxIDFilter: string = "";
  paymentFilter: string = "";
  orderFilter: string = "";
  showFilter: boolean = false;
  shippingVendor: string = "";
  currentUserType: string = "";
  selectedPresenter: string = "";
  presenters: any = [];
  shippingCharge: any=[];
  @HostListener('window:scroll') watchScroll() {
    this.scroll.next(window.scrollY);
  }
  constructor(private _sharedService: SharedService,
    private _http: HttpService,
    public dialog: MatDialog) {
    let userType: string = this._sharedService.userTypeValue;
    this.currentUserType = userType;
    // this.orders = Orders;
    this.scroll
    .pipe(debounceTime(200))
    .subscribe((y) => this.onScroll(window.scrollY));
    this.showScrollTopButton = false;
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
    this._http.getAllPreseters().subscribe((res: any) => {
      this.presenters = JSON.parse(JSON.stringify(res.presenter_info))
    });
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
    this._http.getShippingTypes().subscribe((res: any) => {
      this.shippingCharge = JSON.parse(JSON.stringify(res));
    })
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
          order.box_id = JSON.parse(JSON.stringify(res['boxid']));
          order.cargo_type = JSON.parse(JSON.stringify(res['cargo_type']));
          order.products['customer_name'] = JSON.parse(JSON.stringify(res['order_customer_data']))['customer_name'];
          order.shipping_vendor = JSON.parse(JSON.stringify(res['shipping_vendor']));
          order.vat = JSON.parse(JSON.stringify(res['VAT']));
          order.delivery = JSON.parse(JSON.stringify(res['deliveryCharge']));
          order.discount = JSON.parse(JSON.stringify(res['discount']));
          order.deliveryMode = JSON.parse(JSON.stringify(res['deliveryMode']));
          order.totalCost = JSON.parse(JSON.stringify(res['totalCost']));
          this.currentCustId = JSON.parse(JSON.stringify(res['order_customer_data']))['cust_id'];

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
  isDuplicate(order: any, newProduct: any): boolean {
    let found: boolean = false;
    order.products.forEach((product: any) => {
      if (product.prod_id == newProduct.id) {
        product.prod_quantity += newProduct.qty;
        found = true;
      }
    });
    return found;
  }
  /**
   * 
   */
  addFromCart(id: string) {
    this.orders.forEach((order: any) => {
      if (order.order_id === id) {
        let addQty: boolean = false;
        let cartData = this._sharedService.cartData;
        let product: any;
        cartData.forEach((element: any) => {
          addQty = this.isDuplicate(order, element);
          if (addQty) {
            this._sharedService.openSnackBar("Product added!");
          }
          else {
            product = {
              prod_category: element.category,
              prod_description: element.descp,
              prod_id: element.id,
              prod_name: element.item,
              prod_price: element.cost,
              prod_quantity: element.qty
            }

            order.products.push(product);
          }
          order.products = JSON.parse(JSON.stringify(order.products));

        });

      }

    });
  }

  /**
   * 
   */
  removeItemFromOrder(id: any, orderid: any) {
    let indexToDel = -1;
    this.orders.forEach((order: any) => {
      if (order.order_id === orderid) {
        order.products.forEach((prod: any, index: number) => {
          if (prod.id === id) {
            indexToDel = index;
          }
        });
        if (indexToDel > -1) {
          order.products.splice(indexToDel, 1);
          order.products = JSON.parse(JSON.stringify(order.products));
          return;
        }
      }
    });

  }

  /**
   * 
   */
  goToInvoice(orderid: string) {
    window.open(`/invoice?order_id=${orderid}&cust_id=${this.currentCustId}`, "_blank");
  }

  /**
   * 
   */
  openOrderSummary(orderId: string) {

    let OrderSummaryData;
    this._http.getOrderSummary(orderId).subscribe((res: any) => {
      OrderSummaryData = JSON.parse(JSON.stringify(res));
      const dialogRef = this.dialog.open(OrderSummaryComponent, {
        width: '700px',
        data: { "orderId": orderId, "data": JSON.parse(JSON.stringify(OrderSummaryData)) }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });

    //To Do remove

  }
  /**
   * 
   * 
   */
   openDiscount(order:any) {
    const discountData = {
      delivery: order.delivery,
      vat: order.vat,
      discount: order.discount
    };
    const orderId = order.order_id;
    const dialogRef = this.dialog.open(DiscountComponent, {
      width: '700px',
      data: { "orderId": orderId, "data": JSON.parse(JSON.stringify(discountData)) }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
   }
  /**
   * Method to handle on scroll
   * @param {number} scrollY 
   */
   onScroll(scrollY: number) {
    if (scrollY >= 100) {
      this.showScrollTopButton = true;
    } else {
      this.showScrollTopButton = false;
    }
  }
  /**
   * 
   */
   goToTop() {
     window.scrollTo(0,0);
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

/**
 * Order Summary
 */
@Component({
  selector: 'order-summary-dialog',
  templateUrl: 'order-summary.component.html',
})
export class OrderSummaryComponent {
  orderSummaryArray: any = [];
  constructor(public dialogRef: MatDialogRef<OrderSummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public orderSummary: any) {
      for(let key in this.orderSummary.data) {
        this.orderSummaryArray.push( {
          item: key,
          value: this.orderSummary.data[key]
        });
      }
  }

  close(): void {
    this.dialogRef.close();
  }
}


/**
 * Add Discount Component
 */
 @Component({
  selector: 'discount-dialog',
  templateUrl: 'discount.component.html',
  styleUrls: ['order.component.scss']
})
export class DiscountComponent {
  discount: any = [];
  vat: any = "";
  delivery: any = [];
  orderId: string = "";
  selectedDeliveryCharge: any = "";
  constructor(public dialogRef: MatDialogRef<DiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public discountData: any,
    private _http: HttpService,
    private _sharedService: SharedService) {
      this.vat = discountData.data.vat;
      this.selectedDeliveryCharge = discountData.data.delivery;
      this.orderId = discountData.orderId;
      this.discount = discountData.data.discount;
  }

  close(): void {
    this.dialogRef.close();
  }

  updateDetails() {
    const discountData = {
      "vat": this.vat,
      "discount": this.discount,
      "delivery": this.selectedDeliveryCharge
    }
    this._http.updateDiscount( this.orderId, discountData).subscribe((res) =>{
      this._sharedService.openSnackBar("Discount and Vat updated!!!");
    });
  }
}
