import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorage:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.createFormLogin();
  }
  createFormLogin(){
    this.formLogin=this.formBuilder.group({
      email:["",[Validators.required]],
      password:["",[Validators.required]]
    })
  }
  login(){
    if(this.formLogin.valid){
      console.log(this.formLogin.value);
      let loginModel=Object.assign({},this.formLogin.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        this.router.navigate([""])
        console.log(response)
        this.localStorage.setItem("token",response.data.token)
      },responseError=>{
        this.toastrService.error(responseError.error,"Hata")
      })
    }
  }

}
