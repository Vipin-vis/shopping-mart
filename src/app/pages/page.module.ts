import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { PageRoutingModule } from './page-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared/shared.module';
import { OrderComponent } from './components/order/order.component';



@NgModule({
  declarations: [
    MainComponent,
    ProductsComponent,
    CartComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PageRoutingModule,
    SharedModule,
    MatIconModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatChipsModule,
    MatRadioModule,
    MatTooltipModule,
    MatRippleModule,
    MatButtonToggleModule
  ],
  exports: [
    MainComponent
  ]
})
export class PageModule { }
