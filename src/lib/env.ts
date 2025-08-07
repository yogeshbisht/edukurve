import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.url(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    RESEND_FROM_EMAIL: z.string(),
    ARCJET_API_KEY: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_ENDPOINT_URL_S3: z.string(),
    AWS_ENDPOINT_URL_IAM: z.string(),
    AWS_REGION: z.string(),
    STRIPE_SECRET_KEY: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_AWS_BUCKET_NAME_S3: z.string(),
    NEXT_PUBLIC_S3_MEDIA_URL: z.string(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_AWS_BUCKET_NAME_S3: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME_S3,
    NEXT_PUBLIC_S3_MEDIA_URL: process.env.NEXT_PUBLIC_S3_MEDIA_URL,
  },
});
