"use client";

import BrandLogo from "@/components/brand-logo";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import UserButton from "./user-button";
import ThemeToggle from "@/components/theme-toggle";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <BrandLogo />
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <ThemeToggle />
                <UserButton
                  name={session.user.name}
                  email={session.user.email}
                  image={session.user.image ?? ""}
                />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={buttonVariants({ variant: "default" })}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
