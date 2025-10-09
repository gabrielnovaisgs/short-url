import z from 'zod';

function validate(config: Record<string, unknown>) {
  const envSchema = z.object({
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(['dev', 'staging', 'prod']).default('dev'),
  });

  const envValidation = envSchema.safeParse(config);

  if (!envValidation.success) {
    throw new Error(envValidation.error.message);
  }
  return envValidation.data;
}
export default validate;
