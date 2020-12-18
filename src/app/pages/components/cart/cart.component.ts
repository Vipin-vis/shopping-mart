import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _sharedService: SharedService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  displayedColumns = ['item', 'category', 'quantity', 'cost', 'tCost'];
  products: Product[] = JSON.parse(JSON.stringify(this._sharedService.cartData));

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
      this.products = JSON.parse(JSON.stringify(this._sharedService.cartData)) ;
     // this.changeDetectorRefs.detectChanges();
    }
  }

}

export interface Product {
  item: string;
  cost: number;
  qty: number;
  category: string;
}