import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];
  products: Product[] = [
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

  /**
   * 
   */
  gotoProductSearch() {

  }
}

export interface Product {
  item: string;
  cost: number;
  qty: number;
  category: string;
}