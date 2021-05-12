import { UserInfo } from './auth/dtos/userInfo';
import { Injectable } from '@nestjs/common';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AppService {
  public getUserByToken(token: string): UserInfo {
    return jwtDecode<UserInfo>(token);
  }
}
