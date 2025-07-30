import { env } from "@/lib/env";

const useConstructUrl = (key: string): string => {
  return `${env.NEXT_PUBLIC_S3_MEDIA_URL}/${key}`;
};

export { useConstructUrl };
