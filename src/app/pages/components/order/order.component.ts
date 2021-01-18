import { Component, OnInit } from '@angular/core';
import { Orders, Product } from 'src/app/core/data/dummyData';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];
  orders: any = [];
  displayPayment: boolean = true;
  displayOrderStatus = true;
  displayDeleteOrder = true;
  remarks: string = "";

  constructor(private _sharedService: SharedService,
    private _http: HttpService) {
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
  
  getOrderData():void{
    this._http.getAllOrders().subscribe((res: any) => {
      this.orders = res['order'];
      this.orders.forEach((order: any) => {
        order.products = [];
      });
    })
  
  }

  /** Gets the total cost of all Products. */
  getTotalCost(product:any) {
    return product.map((prod:any) => prod.prod_price * prod.prod_quantity).reduce((acc:any, value:any) => acc + value, 0);
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
    this._http.deleteOrder(id).subscribe((res) => {
      this.getOrderData();
      this._sharedService.openSnackBar("Order Deleted Successfully!!");     
    }, (er) => {
      console.log("Error:", er);
    })
  }

  /**
   * 
   */
  addRemarks() {
    let remarks = {
      "user_name": this._sharedService.loggedUser,
      "user_type": this._sharedService.userType,
      "remarks": this.remarks
    }

    this._http.addRemarks(remarks).subscribe((res: any) => {
      this._sharedService.openSnackBar("Remarks added Successfully!!");
    }, (err: any) => {
      console.error(err);
    })
  }
}
