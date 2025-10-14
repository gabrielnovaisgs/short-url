import { createZodDto } from 'nestjs-zod';
import { createShortUrlDtoSchema, createShortUrlResponseDtoSchema } from '@shorturl/shared';
import z from 'zod';

export class CreateShortUrlRequestDto extends createZodDto(createShortUrlDtoSchema) {}

export class CreateShortUrlResponseDto extends createZodDto(createShortUrlResponseDtoSchema) {}
