import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailsService } from 'src/app/services/car-details.service';

import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm:FormGroup;
  colors:Color[]=[];
  brands:Brand[]=[];
 

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private colorService:ColorService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrand();
    this.getColor();
  }
  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      carName:["",[Validators.required]],
      brandId:["",[Validators.required]],
      colorId:["",[Validators.required]],
      modelYear:["",[Validators.required]],
      dailyPrice:["",[Validators.required]],
      description :["",[Validators.required]],
      findexPoint:["",[Validators.required]]


    })
  }
  addCar(){
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
        
      );
    }
  }

 
  getBrand(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
      
    })
  }
  getColor(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
     
    })
  }
  get form() {
    return this.carAddForm.controls;
  }

}
