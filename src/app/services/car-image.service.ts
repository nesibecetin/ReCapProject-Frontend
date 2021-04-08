import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {


  apiUrl="https://localhost:44360/api/";
  constructor(private httpClient:HttpClient) { }
  getCarImages(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "images/getbyid?id="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);

  }
  addImage(carImage:CarImage,file:any):Observable<ResponseModel>{
    const uploadData = new FormData();
    uploadData.append('Image', file, file.name);
    uploadData.append("CarId",carImage.carId.toString());
    let newPath=this.apiUrl+"images/add";
    return this.httpClient.post<ResponseModel>(newPath,uploadData)
  }
}
