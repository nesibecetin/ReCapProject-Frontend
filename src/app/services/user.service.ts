import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44360/api/"
  constructor(private httpClient:HttpClient) { }
  getUserByEmail(email:User):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"users/getbyemail?email="+email
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getByUserId(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "users/getbyid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  editUserById(user:User):Observable<ResponseModel>{
    let newPath=this.apiUrl+"users/updateUser"
    return this.httpClient.post<ResponseModel>(newPath,user)

  }
}
