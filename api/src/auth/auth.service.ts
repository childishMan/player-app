import { UserInfo } from './dtos/userInfo';
import { LoginInfo } from './dtos/login';
import { User } from './../entities/User';
import { CreateUser } from './dtos/createUser';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  public async createUser(user: CreateUser): Promise<boolean> {
      let hash = await bcrypt.hash(user.password, 10);

      await this.repo.save({ nickname: user.nickname,
        email: user.email,
        imageUrl: user.imageUrl,
        password: hash
      });

      return true;
    
  }

  public async login(user: LoginInfo): Promise<UserInfo> {
    let u = await this.repo.findOne({ email: user.email });
    
    if (!u) return Promise.resolve(undefined);
    let model:UserInfo = {
      id:u.id,
      nickname:u.nickname,
      imageUrl:u.imageUrl
    };
    
    return await bcrypt.compare(user.password, u.password) ? model: undefined;
  }

  public async checkIfExist(mail:string):Promise<boolean>{
    let a = await this.repo.findOne({ email: mail });
    return Promise.resolve(a !== undefined);
  }

  public  validateUser(user:CreateUser):boolean{
      return true;
  }

  public async GetUserInfo(id:string):Promise<UserInfo>{
    let u = await this.repo.findOne({id:id});

    return {id:u.id,nickname:u.nickname,imageUrl:u.imageUrl};
  }
}
