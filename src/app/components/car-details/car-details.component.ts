import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailsService } from 'src/app/services/car-details.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carDetails:CarDetails[]=[];
  carImages:CarImage[]=[];
  dataLoaded=false;
  path="https://localhost:44360/Images/";
  constructor(private carService:CarService,
    private carDetailsService:CarDetailsService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]  ){
        this.getCarsDetailsById(params["carId"])
        this.getCarsImages(params["carId"])
      }     
  })
}
  getCarsImages(carId:number){
    this.carImageService.getCarImages(carId).subscribe(response=>{
      this.carImages=response.data
      this.dataLoaded=true;
    })
  }
  getCarsDetailsById(carId:number){
    this.carDetailsService.getCarDetailsById(carId).subscribe(response=>{
      this.carDetails=response.data
      this.dataLoaded=true;
    })

  }
  isActive(index:number){
    if(index==0){
      return "carousel-item active";
    }else{
      return "carousel-item ";
    }
  }
  getCarImage(carImages:CarImage){

    if(carImages.imagePath){
      return carImages.imagePath
    }
    else{
      return 'default.jpg'
    }
  }
  

}
