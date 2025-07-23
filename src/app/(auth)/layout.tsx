import React from "react";
import BrandLogo from "@/components/brand-logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-8">
      <BrandLogo />
      <div className="flex w-full max-w-sm flex-col gap-6">{children}</div>
    </div>
  );
};

export default AuthLayout;
