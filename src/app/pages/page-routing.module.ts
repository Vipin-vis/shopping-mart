import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order', component: OrderComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', redirectTo: '/products', pathMatch: 'full' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }