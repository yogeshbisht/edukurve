import React from "react";
import BrandLogo from "@/components/brand-logo";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6">
      <BrandLogo />
      <div className="flex w-full flex-col max-w-lg gap-6">{children}</div>
      <div className="text-sm text-muted-foreground text-center">
        By continuing, you agree to our <br />
        <Link href="/terms" className="text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary">
          Privacy Policy.
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EduKurve. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
