import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './components/customer/customer.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { PaymentComponent } from './components/payment/payment.component';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    RentalComponent,
    CustomerComponent,
    CarDetailsComponent,
    FilterBrandPipe,
    FilterColorPipe,
    FilterComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
