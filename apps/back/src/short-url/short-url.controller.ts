import { Controller, Post, Body } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { CreateShortUrlRequestDto, CreateShortUrlResponseDto } from './dto/create-short-url.dto';
import { ApiResponse } from '@nestjs/swagger';


@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The short URL has been created.', type: CreateShortUrlResponseDto })
  create(@Body() createShortUrlDto: CreateShortUrlRequestDto) {
    return this.shortUrlService.save(createShortUrlDto);
  }
}
