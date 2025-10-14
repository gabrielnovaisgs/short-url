import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const createShortUrlDtoSchema = z.object({
  url: z.url(),
});

export class CreateShortUrlDto extends createZodDto(createShortUrlDtoSchema) {}
