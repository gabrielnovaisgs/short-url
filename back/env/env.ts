import z from 'zod';
const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['dev', 'staging', 'prod']).default('dev'),
  BASE_URL: z.string().default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;
function validate(config: Record<string, unknown>): Env {
  const envValidation = envSchema.safeParse(config);

  if (!envValidation.success) {
    throw new Error(envValidation.error.message);
  }
  return envValidation.data;
}
export default validate;
