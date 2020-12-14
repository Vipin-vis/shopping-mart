import { Component, OnInit } from '@angular/core';
import { Orders, Product } from 'src/app/core/data/dummyData';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor() { }
  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];
  orders = Orders;
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
