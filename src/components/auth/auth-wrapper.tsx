import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { AUTH_FORM_PARAMS } from "@/constants/auth";
import { Separator } from "@/components/ui/separator";

interface AuthWrapperProps {
  type: "login" | "signup" | "forgot-password";
  children: React.ReactNode;
}

const AuthWrapper = ({ type, children }: AuthWrapperProps) => {
  const { title, description } = AUTH_FORM_PARAMS[type];

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
      <Separator />
      <CardFooter className="flex justify-center">
        <div className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our <br />
          <Link href="/terms" className="text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary">
            Privacy Policy.
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthWrapper;
