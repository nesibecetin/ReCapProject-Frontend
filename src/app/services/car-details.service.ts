import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetails } from '../models/carDetail';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {

  apiUrl = "https://localhost:44360/api/"
  constructor(private httpClient:HttpClient) { }
 
  getCarImages(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "images/getbyid?id="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);

  }

  getCarDetailsById(carId:number): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + "cars/getcardetailsbyid?id="+carId
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);

  }
}
