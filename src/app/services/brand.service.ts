import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl="https://localhost:44360/api/"
  constructor(private httpClient:HttpClient) { }
  
  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"brands/getall");

  }
  addbrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
  editBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
  getByBrandId(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath=this.apiUrl+"brands/getbyid?id="+brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }
  
 
}
