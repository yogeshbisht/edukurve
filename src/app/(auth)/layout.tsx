import React from "react";
import BrandLogo from "@/components/brand-logo";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-10 left-10",
        })}
      >
        <ArrowLeftIcon className="size-4" />
        Back to Home
      </Link>
      <BrandLogo />
      <div className="flex w-full flex-col max-w-lg gap-6">{children}</div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EduKurve. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
