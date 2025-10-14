import { z } from 'zod';

export const createShortUrlDtoSchema = z.object({
  url: z.url(),
});

export type CreateShortUrlRequestDto = z.infer<typeof createShortUrlDtoSchema>;

export const createShortUrlResponseDtoSchema = z.object({
  shortedUrl: z.string().url(),
  id: z.number(),
});

export type CreateShortUrlResponseDto = z.infer<typeof createShortUrlResponseDtoSchema>;