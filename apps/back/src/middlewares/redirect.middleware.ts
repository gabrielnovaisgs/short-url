import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EnvService } from 'src/env/env.service';
import { ShortUrlService } from 'src/short-url/short-url.service';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  constructor(
    private readonly shortUrlService: ShortUrlService,
    private readonly envService: EnvService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/api')) {
      return next();
    }
    const url = await this.shortUrlService.getOriginalUrl(req.path);
    if (!url) {
      return res.redirect(this.envService.get('FRONT_URL'));
    }
    return res.redirect(url);
  }
}
