import { SongsModule } from './songs/songs.module';
import { Playlist } from './entities/Playlist';
import { Song } from './entities/Song';
import { FileSaverController } from './file saver/filesaver.controller';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/User';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'DESKTOP-5H9GP9D',
      database: 'pc-db',
      username: 'main',
      password: 'user',
      keepConnectionAlive: true,
      entities: [User, Song, Playlist],
      synchronize: true,
    }),
    AuthModule,
    MulterModule.register({
      dest: '../files',
    }),
  ],
  controllers: [FileSaverController, AppController],
  providers: [AppService],
})
export class AppModule {}
