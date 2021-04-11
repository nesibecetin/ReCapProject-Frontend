import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailsService } from 'src/app/services/car-details.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  carEditForm:FormGroup; 
  carDetails:CarDetails;
 
  cars:Car;
  colors:Color[]=[];
  brands:Brand[]=[];


  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    
    this.createCarEditForm();
    this.getBrand();
    this.getColor();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsDetailsById(params['carId']);
     
      
      }
    });
    
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
  createCarEditForm(){
    this.carEditForm=this.formBuilder.group({     
      carName:["",[Validators.required]],
      brandId:["",[Validators.required]],
      colorId:["",[Validators.required]],
      modelYear:["",[Validators.required]],
      dailyPrice:["",[Validators.required]],
      description :["",[Validators.required]],
      findexPoint:["",[Validators.required]]

    })
  }
 
  getCarsDetailsById(carId: number) {
    this.carService.getById(carId).subscribe((response) => {
      this.cars = response.data;
      this.carEditForm.patchValue({
        carName:this.cars.carName,
        colorId: this.cars.colorId,
        brandId: this.cars.brandId,
        modelYear: this.cars.modelYear,
        dailyPrice: this.cars.dailyPrice,
        description: this.cars.description,
        findexPoint:this.cars.findexPoint
        
      })
     
     
    });
  }
 
  editCar(){
    
    if(this.carEditForm.valid){
      let carModel=Object.assign({},this.carEditForm.value)
     carModel.carId=this.cars.carId
      console.log(carModel);
      this.carService.editCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      },responseError=>{
        if(responseError.error.Errors.lenght>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            
          }

        };
        
      })
    }
  }
  get form() {
    return this.carEditForm.controls;
  }

}
