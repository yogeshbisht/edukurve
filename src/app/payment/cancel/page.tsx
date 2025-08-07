import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentCancelPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <CardContent>
          <div className="flex items-center justify-center">
            <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h1 className="text-lg font-semibold">Payment Failed</h1>
            <p className="text-sm text-muted-foreground mt-2 tracking-tight text-balance">
              Your payment has been cancelled. Please try again.
            </p>
          </div>

          <Link
            href="/"
            className={buttonVariants({
              className: "w-full mt-4",
            })}
          >
            <ArrowLeftIcon className="size-4" />
            Back to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
