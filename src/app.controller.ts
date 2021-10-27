import { Controller, Get, Param, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('bulk-iframe-urls')
  getBulkIframeUrl(@Query() query): any {
    if (!query.ids) {
      return {};
    }
    const ids = query.ids.split(',');
    const bordered = query.bordered || true;
    const titled = query.titled || true;
    const response: any = {};
    ids.forEach((id: string) => {
      response[id] = this.appService.getIframeURL(id, { bordered, titled });
    });
    return response;
  }

  @Get(':id')
  getIframeURL(@Param('id') id): string {
    return this.appService.getIframeURL(id, { bordered: true, titled: true });
  }
}
