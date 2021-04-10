import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  profileFrom:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.creataProfileForm();
    this.getUserDetailsById()
    
  }
  creataProfileForm(){
    this.profileFrom=this.formBuilder.group({
      passwordHash : [""],
      passwordSalt : [""],
      status : [""],
      userId:[""],
      firstName:["",[Validators.required]],
      lastName:["",[Validators.required]],
      email:["",[Validators.required,Validators.email]]

    })

  }
  
  getUserDetailsById() {
    this.userService.getByUserId(this.authService.getUserId()).subscribe((response) => {
      this.user = response.data;
      this.profileFrom.patchValue({
        firstName:this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email
      })
     
     
    });
  }

  editProfile(){
    if(this.profileFrom.valid){
      let profileModel=Object.assign({},this.profileFrom.value)
      this.user.firstName=profileModel.firstName
      this.user.lastName=profileModel.lastName
      this.user.email=profileModel.email
      this.userService.editUserById(this.user).subscribe(response=>{
        this.toastrService.success(response.message,"başarılı")
      })
    }

  }
  get form() {
    return this.profileFrom.controls;
  }
}
