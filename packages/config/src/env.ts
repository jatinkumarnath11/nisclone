import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Attempt to load .env from root or local package
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  API_PREFIX: z.string().default('/api/v1'),
  APP_URL: z.string().url().default('http://localhost:3000'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .default('postgresql://ums_user:ums_secure_password_dev@localhost:5432/ums_dev?schema=public'),

  REDIS_URL: z.string().min(1, 'REDIS_URL is required').default('redis://localhost:6379'),

  JWT_SECRET: z
    .string()
    .min(16, 'JWT_SECRET must be at least 16 characters')
    .default('ums_dev_access_token_secret_replace_in_production_key_32bytes!'),

  JWT_REFRESH_SECRET: z
    .string()
    .min(16, 'JWT_REFRESH_SECRET must be at least 16 characters')
    .default('ums_dev_refresh_token_secret_replace_in_production_key_32bytes!'),

  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().default('us-east-1'),
  S3_BUCKET: z.string().default('ums-documents'),
  S3_ACCESS_KEY: z.string().default('minio_admin'),
  S3_SECRET_KEY: z.string().default('minio_secret_key'),
  UPLOAD_MAX_FILE_SIZE_MB: z.coerce.number().default(25),

  SMTP_HOST: z.string().default('smtp.mailtrap.io'),
  SMTP_PORT: z.coerce.number().default(2525),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM_EMAIL: z.string().email().default('no-reply@apex-university.edu'),
  SMTP_FROM_NAME: z.string().default('Apex University Portal'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function getEnv(): EnvConfig {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const errorDetails = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('\n');
    console.error(`❌ Invalid environment configuration:\n${errorDetails}`);
    throw new Error(`Invalid environment configuration: ${errorDetails}`);
  }
  return result.data;
}

export const env = getEnv();
