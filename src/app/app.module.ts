import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car-components/car/car.component';
import { ColorComponent } from './components/color-component/color/color.component';
import { BrandComponent } from './components/brand-component/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarDetailsComponent } from './components/car-components/car-details/car-details.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ToastrModule } from 'ngx-toastr';
import { ColorAddComponent } from './components/color-component/color-add/color-add.component';

import { BrandAddComponent } from './components/brand-component/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-components/car-add/car-add.component';
import { ImageAddComponent } from './components/car-components/image-add/image-add.component';
import { CarEditComponent } from './components/car-components/car-edit/car-edit.component';
import { BrandEditComponent } from './components/brand-component/brand-edit/brand-edit.component';
import { ColorEditComponent } from './components/color-component/color-edit/color-edit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';

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
    PaymentComponent,
    ColorAddComponent,
    BrandAddComponent,
    CarAddComponent,
    ImageAddComponent,
    CarEditComponent,
    BrandEditComponent,
    ColorEditComponent,
    LoginComponent,
    RegisterComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
