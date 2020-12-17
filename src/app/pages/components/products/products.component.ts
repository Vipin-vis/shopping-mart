import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';

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

  constructor(private _httpService: HttpService) {
    this.showSearchButton = false;
  }

  ngOnInit(): void {
    //this.productList = products;
    this.scroll
      .pipe(debounceTime(200))
      .subscribe((y) => this.onScroll(window.scrollY));

    this._httpService.getProducts("all").subscribe((res) => {
      this.productList = res;
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
    console.log(scrollY)
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
}