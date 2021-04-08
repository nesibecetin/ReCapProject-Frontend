import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
apiUrl="https://localhost:44360/api/"
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"colors/add"
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
  editColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"colors/update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  getById(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl+"colors/getbyid?id="+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }
}
