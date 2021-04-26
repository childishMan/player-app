import { UserInfo } from './../../../dtos/userInfo';
import { AuthService } from 'src/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-badge',
  templateUrl: './UserBadge.component.html',
  styleUrls: ['./UserBadge.component.scss']
})
export class UserBadgeComponent implements OnInit {

  data:UserInfo;
  defaultImage="assets/images/choppa.jpg"
  isLoading = false;

  constructor(private authService:AuthService) {
    this.data = {nickname:'',email:'',imageUrl:''};
   }

  ngOnInit() {
     this.data = this.authService.getUserInfo();
     this.data.imageUrl = this.data.imageUrl ?? this.defaultImage;
   }


   logout(){
     this.authService.logout();
   }

}
