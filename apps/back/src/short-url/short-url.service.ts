import { Injectable } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { BaseConverter } from './entities/base-converter.entity';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class ShortUrlService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly envService: EnvService,
  ) {}
  async save(
    createShortUrlDto: CreateShortUrlDto,
  ): Promise<{ shortedUrl: string; id: number }> {
    let url = await this.prisma.url.findUnique({
      where: { url: createShortUrlDto.url },
      select: { id: true },
    });
    if (!url) {
      url = await this.prisma.url.create({
        data: { url: createShortUrlDto.url },
      });
    }

    return { shortedUrl: this.encodeShortUrl(url.id), id: url.id };
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
    return `${this.envService.get('BASE_URL')}/${shortedId}`;
  }

  private decodeShortUrl(url: string): number {
    const encodedPart = url
      .replace(`${this.envService.get('BASE_URL')}`, '')
      .replace('/', '');
    return BaseConverter.toBase10(encodedPart);
  }
}
