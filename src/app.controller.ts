import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getIframeURL(@Param('id') id): string {
    console.log(`Question id=${id}`);
    return this.appService.getIframeURL(id);
  }
}
