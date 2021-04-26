import { LoginInfo } from './dtos/login';
import { JwtAuthGuard } from './../guard/jwtauth.guard';
import { AuthService } from './auth.service';
import { CreateUser } from './dtos/createUser';
import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Req, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller("auth")
export class AuthController {
    
    constructor(private authService:AuthService, private jwt:JwtService){
    }

    @Post("create")
    public async createUser(@Body() user:CreateUser){
        if(!this.authService.validateUser(user))
            throw new HttpException("Unvalid data",HttpStatus.BAD_REQUEST);

        if(await this.authService.checkIfExist(user.email))
            throw new HttpException("Already exist",HttpStatus.CONFLICT);

            if(!await this.authService.createUser(user)){
                throw new HttpException("Internal error",HttpStatus.INTERNAL_SERVER_ERROR);
            }

    }

    @Post('login')
    public async Login(@Body() user:LoginInfo):Promise<any>{
        let userInfo = await this.authService.login(user);
        if(userInfo){
            let token = await this.jwt.signAsync({email:user.email,id:userInfo.id,nickname:userInfo.nickname,imageUrl:userInfo.imageUrl});
            return {token:token}
        }

        return null;
    }
    
}
