
import { Controller, Get } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
