import { JwtStrategy } from './jwt-strategy';
import { User } from './../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      "secret":'kurwa',
      signOptions:{
        expiresIn:'100000s'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[JwtModule]
})
export class AuthModule {}
