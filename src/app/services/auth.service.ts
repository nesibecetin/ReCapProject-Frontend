import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper:JwtHelperService = new JwtHelperService();

  apiUrl="https://localhost:44360/api/auth/"
  userId:number;
  constructor(private httpClient:HttpClient,
    private localStorage:LocalStorageService) { 
      this.setUserId()
    }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  register(registerModel:RegisterModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"register",registerModel);
  }

  setUserId(){
    if (this.localStorage.getItem("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorage.get("token"));
      var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
      this.userId = Number(decoded[propUserId]);
    }
  }

  getUserId():number{
    console.log(this.userId)
    return this.userId;
  }
}
