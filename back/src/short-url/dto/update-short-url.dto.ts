import { createShortUrlDtoSchema } from './create-short-url.dto';
import z from 'zod';

export const updateShortUrlDtoSchema = createShortUrlDtoSchema.partial();
export type UpdateShortUrlDto = z.infer<typeof updateShortUrlDtoSchema>;
