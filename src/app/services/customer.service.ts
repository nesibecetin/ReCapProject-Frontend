import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
apiUrl="https://localhost:44360/api/";
  constructor(private httpClient:HttpClient) { }
  getCustomer():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerById(customerId:number):Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "customers/getbyid?id="+customerId
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);

  }
}
