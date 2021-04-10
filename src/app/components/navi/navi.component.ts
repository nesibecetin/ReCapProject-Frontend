import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  currentUserId:number;
   user:User;
  constructor(private authService:AuthService,
    private localStorage:LocalStorageService,
    private userService:UserService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.getUserById();
  }
  isAuthenticated(){
    return this.authService.isAuthenticated()
  }
  logout(){
    this.localStorage.removeItem("token");
  }
  getUserById(){
    this.userService.getByUserId(this.currentUserId).subscribe(response => {
      this.user = response.data;
      console.log(this.user.firstName)
    });
  }
 

}
