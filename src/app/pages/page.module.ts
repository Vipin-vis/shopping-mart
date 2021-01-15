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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { PageRoutingModule } from './page-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared/shared.module';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersComponent } from './components/users/users.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EndUserComponent } from './components/end-user/end-user.component';

import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
  declarations: [
    MainComponent,
    ProductsComponent,
    CartComponent,
    OrderComponent,
    LoginComponent,
    AdminPanelComponent,
    UsersComponent,
    AddProductComponent,
    EndUserComponent
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
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDividerModule,
    MatProgressBarModule,
    ClipboardModule,
    MatSnackBarModule
  ],
  exports: [
    MainComponent
  ]
})
export class PageModule { }
