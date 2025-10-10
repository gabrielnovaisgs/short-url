import { Injectable } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { BaseConverter } from './entities/base-converter.entity';

@Injectable()
export class ShortUrlService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async save(createShortUrlDto: CreateShortUrlDto): Promise<string> {
    const url = await this.prisma.url.upsert({
      where: { url: createShortUrlDto.url },
      update: {},
      create: { url: createShortUrlDto.url },
      select: { id: true },
    });

    return this.encodeShortUrl(url.id);
  }

  async getOriginalUrl(path: string): Promise<string | undefined> {
    const id = this.decodeShortUrl(path);
    const url = await this.prisma.url.findUnique({
      where: { id },
      select: { url: true },
    });

    if (!url) return;
    return url.url;
  }

  private encodeShortUrl(id: number): string {
    const shortedId = BaseConverter.toBase62(id);
    return `${this.configService.get('BASE_URL')}/${shortedId}`;
  }

  private decodeShortUrl(url: string): number {
    const encodedPart = url
      .replace(`${this.configService.get('BASE_URL')}}`, '')
      .replace('/', '');
    return BaseConverter.toBase10(encodedPart);
  }
}
