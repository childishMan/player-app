import { JwtAuthGuard } from './../guard/jwtauth.guard';
import {
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
  UseGuards,
  Get,
  Param,
  Res
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { from, of } from 'rxjs';
import { Response } from 'express';
import {Readable} from 'stream'
import * as fileSystem from 'fs';

const filePath = '/files/';


@Controller('upload')
export class FileSaverController {
  @Post('song')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage:diskStorage({
        destination: (req, file, cb) => {
          cb(null, './files/songs');
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + file?.originalname);
        },
      }),
    }),
  )
  uploadSong(@UploadedFile() file: Express.Multer.File) {
    return { path: file?.filename };
  }

  @Get('song/:name')
  getSong(@Param('name') name:string,@Res() res:Response){
    let path = process.cwd()+filePath+'songs/'+name;

    let stat = fileSystem.statSync(path);

    if(stat.isFile()){
      res.set('content-type','audio/mp3');
      res.set('content-length',stat.size?.toString());
      res.set('accept-range','bytes')

      fileSystem.createReadStream(path).pipe(res);
    }
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './files/images');
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + file?.originalname);
        },
      }),
    })
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
      return { path: file?.filename };
  }

  @Get('image/:name')
  getImage(@Param('name') name:string,@Res() res:Response){
      return of(res.sendFile(process.cwd()+filePath+'images/'+name))
  }
}
