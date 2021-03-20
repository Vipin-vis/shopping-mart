import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CartComponent } from './components/cart/cart.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EndUserComponent } from './components/end-user/end-user.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { PackingPanelComponent } from './components/packing-panel/packing-panel.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesReportComponent } from './components/sales-report/sales-report.component';
import { ShippingChargeComponent } from './components/shipping-charge/shipping-charge.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
    {
        path: 'products', component: ProductsComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'products'
        }
    },
    {
        path: 'cart', component: CartComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'cart'
        }
    },
    {
        path: 'order', component: OrderComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'order'
        }
    },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin-panel', component: AdminPanelComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'admin-panel'
        }
    },
    {
        path: 'users', component: UsersComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'users'
        }
    },
    {
        path: 'addproduct', component: AddProductComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'addproduct'
        }
    },
    {
        path: 'shippingCharge', component: ShippingChargeComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'shippingCharge'
        }
    },
    {
        path: 'changePassword', component: ChangePasswordComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'changePassword'
        }
    },
    { path: 'userConfirmation', component: EndUserComponent },
    {
        path: 'packing-panel', component: PackingPanelComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'packing-panel'
        }
    },
    {
        path: 'home', redirectTo: '/products', pathMatch: 'full',
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'home'
        }
    },
    {
        path: 'invoice', component: InvoiceComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'invoice'
        }
    },
    {
        path: 'totalSalesReport', component: SalesReportComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: 'totalSalesReport'
        }
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }