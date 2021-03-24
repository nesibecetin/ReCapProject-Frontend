import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  cardetails: CarDetails[] = [];
  dataLoaded=false;
  currentCar: CarDetails;
  path="https://localhost:44360/Images/";
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]  ){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"] ){
        this.getCarsByColor(params["colorId"])}
      else{
        this.getCarDetails()
      }
    })
    
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })

  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cardetails=response.data
      this.dataLoaded=true;
    })
  }
  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.cardetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cardetails=response.data
      this.dataLoaded=true;
    })
  }
  getCarImage(cardetail:CarDetails){

    if(cardetail.imagePath){
      return cardetail.imagePath
    }
    else{
      return 'default.jpg'
    }
  }
  
 
  


}
