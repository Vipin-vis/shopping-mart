import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CartComponent } from './components/cart/cart.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EndUserComponent } from './components/end-user/end-user.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingChargeComponent } from './components/shipping-charge/shipping-charge.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order', component: OrderComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin-panel', component: AdminPanelComponent },
    { path: 'users', component: UsersComponent },
    { path: 'addproduct', component: AddProductComponent },
    { path: 'shippingCharge', component: ShippingChargeComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'userConfirmation', component: EndUserComponent },
    { path: 'home', redirectTo: '/products', pathMatch: 'full' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }