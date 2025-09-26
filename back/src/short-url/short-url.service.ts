import { Injectable } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShortUrlService {
  constructor() {}
  create(createShortUrlDto: CreateShortUrlDto) {
    return 'This action adds a new shortUrl';
  }

  base62NumberConverter(value: number): string {
    const BASE = 62;
    const CHARSET =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
        '',
      );

    const result: string[] = [];
    while (true) {
      if (value < BASE) {
        const rest = value % BASE;

        const pos = parseInt(rest.toFixed(0));
        result.push(CHARSET[pos]);
        result.push(value);
        break;
      }

      const valueDivided = parseInt((value / BASE).toFixed(0));
      const pos = valueDivided;
      result.push(CHARSET[pos]);
      if (valueDivided < BASE) {
      }
      value = rest;
    }

    console.log(result);
    return result.toString().replaceAll(',', '');
  }
}
