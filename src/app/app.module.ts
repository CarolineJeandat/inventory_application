import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { HeaderComponent } from './components/header/header.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { SearchProductComponent } from './components/search-product/search-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductDetailComponent,
    ProductsListComponent,
    HeaderComponent,
    SingleProductComponent,
    SearchProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
