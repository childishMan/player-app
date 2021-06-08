import { MusicPlayService } from './play.service';
import { User } from './../dtos/createUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfo } from './../dtos/userInfo';
import { login } from './../dtos/login';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { LoginStatus } from 'src/assets/LoginStatus';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private apiPath = '/api/auth/';
  
  id: string = '';

  private jwtHelper:JwtHelperService;

  constructor(private httpClient: HttpClient,private router:Router,private playService:MusicPlayService) {
    this.jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if(token){
      this.id = this.jwtHelper.decodeToken(token).id;
    }

  }

  login(data: login): BehaviorSubject<LoginStatus> {
    let sub = new BehaviorSubject<LoginStatus>(LoginStatus.Invalid);

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

  register(data:User):Observable<any>{
    return this.httpClient.post(this.apiPath+'create',data);
  }

  logout() {
    localStorage.removeItem('token');
    this.playService.stop();
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
        imageUrl:decodedToken.imageUrl
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
