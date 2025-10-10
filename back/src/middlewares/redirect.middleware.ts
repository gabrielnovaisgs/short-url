import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { NextFunction, Request, Response } from 'express';
import { ShortUrlService } from 'src/short-url/short-url.service';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  constructor(
    private readonly shortUrlService: ShortUrlService,
    private readonly configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/api')) {
      next();
    }
    const url = await this.shortUrlService.getOriginalUrl(req.path);
    if (!url) {
      return res.redirect(this.configService.get<string>('FRONT_URL')!);
    }
    return res.redirect(url);
  }
}
