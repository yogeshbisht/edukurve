import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentSuccessPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <CardContent>
          <div className="flex items-center justify-center">
            <CheckCircleIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h1 className="text-lg font-semibold">Payment Success</h1>
            <p className="text-sm text-muted-foreground mt-2 tracking-tight text-balance">
              Your payment has been successful. You should now have access to
              the course! Please check your email for the receipt.
            </p>
          </div>

          <Link
            href="/dashboard"
            className={buttonVariants({
              className: "w-full mt-4",
            })}
          >
            <ArrowLeftIcon className="size-4" />
            Go to Dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
