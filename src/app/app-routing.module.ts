import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-component/brand-add/brand-add.component';
import { BrandEditComponent } from './components/brand-component/brand-edit/brand-edit.component';
import { CarAddComponent } from './components/car-components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-components/car-details/car-details.component';
import { CarEditComponent } from './components/car-components/car-edit/car-edit.component';
import { CarComponent } from './components/car-components/car/car.component';
import { ImageAddComponent } from './components/car-components/image-add/image-add.component';
import { ColorAddComponent } from './components/color-component/color-add/color-add.component';
import { ColorEditComponent } from './components/color-component/color-edit/color-edit.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarImageService } from './services/car-image.service';

const routes: Routes = [
  {path:"",  component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"rental",component:RentalComponent},
  {path:"customer",component:CustomerComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/car-details/:carId",component:CarDetailsComponent},
  {path:"cars/:brandId/:colorId",component:CarComponent},
  {path:"payment/:rental",component:PaymentComponent},
  {path:"color/add",component:ColorAddComponent},
  {path:"brand/add",component:BrandAddComponent},
  {path:"car/add",component:CarAddComponent},
  {path:"car/image/add",component:ImageAddComponent},
  {path:"car/edit/:carId",component:CarEditComponent},
  {path:"brand/edit/:brandId",component:BrandEditComponent},
  {path:"color/edit/:colorId",component:ColorEditComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
