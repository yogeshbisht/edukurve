import { BookMarkedIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const BrandLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <BookMarkedIcon className="size-6" />
      <span className="text-2xl font-bold">
        <span className="text-primary">edu</span>
        <span className="text-muted-foreground">kurve.</span>
      </span>
    </Link>
  );
};

export default BrandLogo;
