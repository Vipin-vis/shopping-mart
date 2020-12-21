import { Component, OnInit } from '@angular/core';
import { Orders, Product } from 'src/app/core/data/dummyData';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];
  orders = Orders;
  displayPayment: boolean = true;
  displayOrderStatus = true;
  displayDeleteOrder = true;

  constructor(private _sharedService: SharedService) {
    let userType: string = this._sharedService.userTypeValue;
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

  products: any[] = [
    { item: 'Beach ball', category: "Sports", cost: 250, qty: 1 },
    { item: 'Towel', category: "Clothings", cost: 500, qty: 1 },
    { item: 'Frisbee', category: "Sports", cost: 200, qty: 1 },
    { item: 'Sunscreen', category: "Skin", cost: 150, qty: 1 },
    { item: 'Cooler', category: "Clothings", cost: 1500, qty: 1 },
    { item: 'tees', category: "Clothings", cost: 999, qty: 1 },
  ];

  /** Gets the total cost of all Products. */
  getTotalCost() {
    return this.products.map(prod => prod.cost * prod.qty).reduce((acc, value) => acc + value, 0);
  }

  ngOnInit(): void {
  }

  getProduct(oderID: any) {
    return Product.filter(prod => prod.id === oderID)
  }
}
