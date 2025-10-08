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
        result.unshift(CHARSET[value]);
        break;
      }
      const rest = value % BASE;
      result.unshift(CHARSET[rest]);
      value = Math.floor(value / BASE);
    }

    console.log(result);
    return result.toString().replaceAll(',', '');
  }
}
