import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { SearchProductComponent } from './components/search-product/search-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products-list' },
  { path: 'products-list', component: ProductsListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: ProductDetailComponent },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'search-product', component: SearchProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }