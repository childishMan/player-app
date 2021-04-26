import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as fs from 'fs'

const folders = ['/files','/files/images','/files/songs']


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  folders.forEach(f=>{
    if(!fs.existsSync(f)){
      fs.mkdirSync(f);
    }
  })
  
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.listen(3000);
}
bootstrap();
