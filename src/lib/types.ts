import { User as BetterAuthUser } from "better-auth";

export type ApiResponse<T> = {
  data?: T;
  message?: string;
  status?: "success" | "error";
};

export type FeatureProps = {
  title: string;
  description: string;
  icon: React.ElementType;
};

// Extended User type that includes all Prisma fields
export type User = BetterAuthUser & {
  role?: string | null;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date | null;
  stripeCustomerId?: string | null;
};
