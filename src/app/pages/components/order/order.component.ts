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

  constructor(private _sharedService: SharedService,
    private _http: HttpService) {
    let userType: string = this._sharedService.userTypeValue;
    // this.orders = Orders;
    this._http.getAllOrders().subscribe((res: any) => {
      this.orders = res['order'];
      this.orders.forEach((order: any) => {
        order.products = [];
      });
    })
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

  /** Gets the total cost of all Products. */
  getTotalCost() {
    return this.products.map(prod => prod.prod_price * prod.prod_quantity).reduce((acc, value) => acc + value, 0);
  }

  ngOnInit(): void {
  }

  getProduct(oderID: any) {
    return Product.filter(prod => prod.id === oderID)
  }

  openPanel(id: string) {
    this.orders.forEach((order: any) => {
      if (order.order_id === id) {
        this._http.getOrderDetails(id).subscribe((res: any) => {
          order.products = { ...res['order_product_data'] }
        })
      }
    });
  }

  /**
   * 
   */
  deleteOrder(id: string) {
    this._http.deleteOrder(id).subscribe((res) => {
      this._sharedService.openSnackBar("Order Dleted Successfully!!");
    }, (er) => {
      console.log("Error:", er);
    })
  }
}
