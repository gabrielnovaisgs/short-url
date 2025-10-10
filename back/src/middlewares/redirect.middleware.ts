import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ShortUrlService } from 'src/short-url/short-url.service';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  constructor(private readonly shortUrlService: ShortUrlService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/api')) {
      next();
    }
    console.log();
    const url = await this.shortUrlService.getOriginalUrl(req.path);
    console.log(url);
    next();
  }
}
