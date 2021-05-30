import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { PageRoutingModule } from './page-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared/shared.module';
import { OrderComponent, orderRemarksComponent, OrderSummaryComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersComponent } from './components/users/users.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EndUserComponent } from './components/end-user/end-user.component';

import { ClipboardModule } from 'ngx-clipboard';
import { ShippingChargeComponent } from './components/shipping-charge/shipping-charge.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PackingPanelComponent } from './components/packing-panel/packing-panel.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { OrderPipe, OrderPipeOrder, OrderPipePayment, OrderPipeStatus } from '../core/filter/order-pipe.pipe';
import { SalesReportComponent } from './components/sales-report/sales-report.component';
import { BoxidReportComponent } from './components/boxid-report/boxid-report.component';
import { PackingManifestComponent } from './components/packing-manifest/packing-manifest.component';
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
    EndUserComponent,
    ShippingChargeComponent,
    ChangePasswordComponent,
    PackingPanelComponent,
    ConfirmPopupComponent,
    orderRemarksComponent,
    OrderSummaryComponent,
    InvoiceComponent,
    OrderPipe,
    OrderPipeOrder,
    OrderPipePayment,
    OrderPipeStatus,
    SalesReportComponent,
    BoxidReportComponent,
    PackingManifestComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
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
    MatProgressSpinnerModule,
    ClipboardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatNativeDateModule
  ],
  exports: [
    MainComponent, MatButtonModule
  ],
  entryComponents: [ConfirmPopupComponent],
})
export class PageModule { }
