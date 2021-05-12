import { AppService } from './../app.service';
import { JwtAuthGuard } from './../guard/jwtauth.guard';
import { GetSong } from './dtos/GetSong';
import { SongsService } from './songs.service';
import { NewSong } from './dtos/AddSong';
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  UseInterceptors,
  Req,
  Request,
  Param,
} from '@nestjs/common';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('songs')
@UseGuards(JwtAuthGuard)
export class SongsController {
  constructor(
    private songsService: SongsService,
    private serivce: AppService,
  ) {}

  @Post()
  addNewSong(@Body() data: GetSong) {
    if (data.id) {
        this.songsService.editSong(data);
    } else {
      if (!this.songsService.validateSong(data))
        throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);

      this.songsService.addSong(data);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllSongs(@Req() req): Promise<GetSong[]> {
    return await this.songsService.getAllSongs(req?.user?.userId);
  }
}
