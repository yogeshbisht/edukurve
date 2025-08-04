import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BanIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const EmptyState = ({
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyStateProps) => {
  return (
    <div className="flex justify-center items-center h-full mt-12">
      <Card className="w-full max-w-md">
        <div className="flex justify-center items-center">
          <BanIcon className="size-20 text-red-300" />
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Link
            href={buttonLink}
            className={buttonVariants({
              variant: "outline",
              className: "w-full",
            })}
          >
            <PlusCircleIcon className="size-4" />
            {buttonText}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmptyState;
