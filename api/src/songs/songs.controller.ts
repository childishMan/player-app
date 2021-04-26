import { JwtAuthGuard } from './../guard/jwtauth.guard';
import { GetSong } from './dtos/GetSong';
import { SongsService } from './songs.service';
import { NewSong } from './dtos/AddSong';
import { Body, Controller, Post, HttpException, HttpStatus, Get, UseGuards } from '@nestjs/common';

@Controller("songs")
@UseGuards(JwtAuthGuard)
export class SongsController {
    constructor(private songsService:SongsService)
    {}

    @Post()
    addNewSong(@Body() data:NewSong){
        if(!this.songsService.validateSong(data))
            throw new HttpException("Invalid data",HttpStatus.BAD_REQUEST);
        
        this.songsService.addSong(data);
    }

    @Get()
    async getAllSongs():Promise<GetSong[]>{
        console.log('gg')
        return await this.songsService.getAllSongs()
    }
}
