import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':shortedUrl')
  getHello(@Param() shortedUrl: string): string {
    return this.appService.redirect(shortedUrl);
  }
}
