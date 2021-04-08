import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetails } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';

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
  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getcardetailsbyfilter?bId="+brandId+"&cId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }

  addCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
  editCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  getById(CarId:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getbyid?id="+CarId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  
}
