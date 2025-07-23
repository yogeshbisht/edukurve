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
  const { title, description, footer } = AUTH_FORM_PARAMS[type];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
      <Separator />
      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          {footer.text}
          <Link href={footer.link} className="text-primary">
            {footer.linkText}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthWrapper;
