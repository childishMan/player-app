import { GetSong } from './dtos/GetSong';
import { User } from './../entities/User';
import { Playlist } from './../entities/Playlist';
import { Repository, getRepository } from 'typeorm';
import { NewSong } from './dtos/AddSong';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Song } from 'src/entities/Song';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
  private userRepo: Repository<User>;

  constructor( @InjectRepository(Song) private songsRepo:Repository<Song>,
               @InjectRepository(Playlist) private playlistRepo:Repository<Playlist>) 
               {
                    this.userRepo = getRepository(User);
               }

  async addSong(song: NewSong) {
    let user = await this.userRepo.findOne({ id: song.uploader });

    if(!user){
        throw new HttpException('user not found',HttpStatus.BAD_REQUEST);
    }

    this.songsRepo.create({ 
        name: song.name,
        songUrl:song.path,
        artists:song.artists,
        uploader:user,
        coverUrl:song.coverUrl
    });
  }

   validateSong(song: NewSong): boolean{
    return (
      song &&
      song.artists != '' &&
      song.name != '' &&
      song.path != '' &&
      song.uploader != undefined 
    );
  }

  async getAllSongs():Promise<GetSong[]>{
      return (await this.songsRepo.find()).map((e:Song)=>{
          let a:GetSong = {
              id:e.id,
              name:e.name,
              coverUrl:e.coverUrl,
              songUrl:e.songUrl,
              artists:e.artists
          }
          return a;
      })
  }
}
