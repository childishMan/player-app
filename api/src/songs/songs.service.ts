import { GetSong } from './dtos/GetSong';
import { User } from './../entities/User';
import { Playlist } from './../entities/Playlist';
import { Repository, getRepository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Song } from 'src/entities/Song';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
  private userRepo: Repository<User>;

  constructor(
    @InjectRepository(Song) private songsRepo: Repository<Song>,
    @InjectRepository(Playlist) private playlistRepo: Repository<Playlist>,
  ) {
    this.userRepo = getRepository(User);
  }

  async addSong(song: GetSong) {
    let user = await this.userRepo.findOne({ id: song.uploader });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    await this.songsRepo.save({
      name: song.name,
      songUrl: song.songUrl,
      artists: song.artists,
      uploader: user,
      coverUrl: song.coverUrl,
      isPublic: song.isPublic,
    });
  }

  async editSong(song: GetSong) {

    await this.songsRepo.update({ id: song.id },{
      name:song.name,
      artists:song.artists,
      coverUrl:song.coverUrl,
      isPublic:song.isPublic
    }).catch((err)=>{
      throw new HttpException('song not found', HttpStatus.BAD_REQUEST);
    });
  }

  validateSong(song: GetSong): boolean {
    return (
      song &&
      song.artists != '' &&
      song.name != '' &&
      song.songUrl != '' &&
      song.uploader != undefined
    );
  }

  async getAllSongs(userId?: string): Promise<GetSong[]> {
    return (
      await this.songsRepo.find({
        where: [
          {
            isPublic: 'true',
          },
          {
            isPublic: 'false',
            uploader: userId ?? '',
          },
        ],
        relations: ['uploader'],
      })
    ).map((e: Song) => {
      let a: GetSong = {
        id: e.id,
        name: e.name,
        coverUrl: e.coverUrl,
        songUrl: e.songUrl,
        artists: e.artists,
        uploader: e.uploader.id,
        isPublic: e.isPublic,
      };
      return a;
    });
  }
}
