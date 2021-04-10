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
import { ProfileComponent } from './components/customer/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';
import { CarImageService } from './services/car-image.service';

const routes: Routes = [
  {path:"",  component:CarComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/car-details/:carId",component:CarDetailsComponent},
  {path:"cars/:brandId/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"car/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"car/image/add",component:ImageAddComponent},
  {path:"car/edit/:carId",component:CarEditComponent},

  
  {path:"brand/add",component:BrandAddComponent},
  {path:"brand/edit/:brandId",component:BrandEditComponent},

  {path:"color/add",component:ColorAddComponent},
  {path:"color/edit/:colorId",component:ColorEditComponent},

  {path:"rental",component:RentalComponent},
  {path:"customer",component:CustomerComponent},
  {path:"payment/:rental",component:PaymentComponent},
  {path:"profile",component:ProfileComponent},
  

  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
