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

  @HostListener('window:scroll') watchScroll() {
    this.scroll.next(window.scrollY);
  }
  @ViewChild('search') searchElement!: ElementRef;

  constructor(private _httpService: HttpService, private _sharedService: SharedService) {
    this.showSearchButton = false;
  }

  ngOnInit(): void {
    //this.productList = products;
    this.scroll
      .pipe(debounceTime(200))
      .subscribe((y) => this.onScroll(window.scrollY));

    this._httpService.getProducts("all").subscribe((res) => {
      this.productList = res;
      this.productList.forEach((product: any) => {
        product.tempQuan = 0;
      });
    })
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
  gotoSearch() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.searchElement.nativeElement.focus();
  }

  addProduct(item:any) {
    let itemToadd = {
      "item": item.name,
      "category": "category",
      "cost":item.price,
      "qty":item.tempQuan,
      "id":item.id
    }
    this._sharedService.setCartData(itemToadd);
  }

  incrementProd(item: any) {
    this.productList.forEach((product: any) => {
      if (product.id === item.id) {
        if (item.tempQuan < 0) {
          return;
        } else if (item.tempQuan == 0) {
          item.tempQuan = item.tempQuan + 2;
        } else {
          item.tempQuan++;
        }
      }
    });
  }
  decrementProd(item: any) {
    this.productList.forEach((product: any) => {
      if (product.id === item.id) {
        if (item.tempQuan < 0) {
          return
        } else {
          item.tempQuan--;
        }
      }
    });
  }
}