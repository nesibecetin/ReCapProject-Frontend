import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetails } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44360/api/"
  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);

  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetails>> {
    let newPath = this.apiUrl + "cars/getbybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarDetails():Observable<ListResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath)

  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getbycolorid?id="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);

  }
}
