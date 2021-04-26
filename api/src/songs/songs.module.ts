import { Playlist } from './../entities/Playlist';
import { Song } from 'src/entities/Song';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Song,Playlist])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
