
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfo } from './../dtos/userInfo';
import { login } from './../dtos/login';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LoginStatus } from 'src/assets/LoginStatus';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private apiPath = '/api/auth/';
  
  id: number = 0;

  private jwtHelper:JwtHelperService;

  constructor(private httpClient: HttpClient,private router:Router) {
    this.jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if(token){
      this.id = this.jwtHelper.decodeToken(token).id;
    }

  }

  login(data: login): Subject<LoginStatus> {
    let sub = new Subject<LoginStatus>();

    this.httpClient.post(this.apiPath + 'login', data).subscribe(
      (tokenObj: any) => {
        let resp = tokenObj as { token: string };

        if (resp && resp.token) {
          localStorage.setItem('token',resp.token);

          this.getUserInfo();

          sub.next(LoginStatus.Success);
        } 
        else {
          sub.next(LoginStatus.Invalid);
        }
      },
      (error) => {
        sub.next(LoginStatus.Fail);
      }
    );

    sub.subscribe((val: LoginStatus) => {
      if (val === LoginStatus.Success) this.getUserInfo();
    });

    return sub;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getUserInfo():UserInfo {
    let token = localStorage.getItem('token');
    let model:UserInfo = new UserInfo();

    if(token){
      let decodedToken = this.jwtHelper.decodeToken(token);

      model = {
        nickname:decodedToken.nickname,
        email:decodedToken.email,
        imageUrl:decodedToken.iamgeUrl
      }

      this.id = decodedToken.id;
    }

    return model;
  }

  isAuth():boolean{
    let token = localStorage.getItem('token');
    if(token){
      if(this.jwtHelper.isTokenExpired(token))
      {
        localStorage.removeItem('token');
        return false;
      }
      else{
        return true;
      }
    }

    return false;
  }
}
