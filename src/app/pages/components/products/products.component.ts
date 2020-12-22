import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList: any;

  scroll = new Subject<number>();

  showSearchButton: boolean;

  searchKey: string;

  @HostListener('window:scroll') watchScroll() {
    this.scroll.next(window.scrollY);
  }
  @ViewChild('search') searchElement!: ElementRef;

  constructor(private _httpService: HttpService, private _sharedService: SharedService) {
    this.showSearchButton = false;
    this.searchKey = "";
  }

  ngOnInit(): void {
    //this.productList = products;
    this.scroll
      .pipe(debounceTime(200))
      .subscribe((y) => this.onScroll(window.scrollY));
  }

  ngOnDestroy() {
    this.scroll.complete();
  }
  /**
   * Method to handle on scroll
   * @param {number} scrollY 
   */
  onScroll(scrollY: number) {
    if (scrollY >= 100) {
      this.showSearchButton = true;
    } else {
      this.showSearchButton = false;
    }
  }
  /**
   * 
   */
  searchProduct() {
    this._httpService.getProducts(this.searchKey).subscribe((res) => {
      //this.productList = JSON.parse(JSON.stringify(res["prod_data"]));
      this.productList = JSON.parse(JSON.stringify(res));
      this.productList.forEach((product: any) => {
        product.tempQuan = 0;
      });
    });
  }
  /**
   * 
   */
  gotoSearch() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.searchElement.nativeElement.focus();
  }

  addProduct(item: any) {
    let itemToadd = {
      "item": item.prod_name,
      "category": "category",
      "cost": item.prod_price,
      "qty": item.tempQuan,
      "id": item.prod_id,
      "descp": item.prod_description
    }
    this._sharedService.setCartData(itemToadd);
  }

  incrementProd(item: any) {
    this.productList.forEach((product: any) => {
      if (product.id === item.id) {
        if (item.tempQuan < 0) {
          return;
        }  else {
          item.tempQuan++;
        }
      }
    });
  }
  decrementProd(item: any) {
    this.productList.forEach((product: any) => {
      if (product.id === item.id) { 
        if (item.tempQuan < 0) {
          item.temQuan=0;
          return
        } else {
          item.tempQuan--;
        }
      }
    });
  }
}