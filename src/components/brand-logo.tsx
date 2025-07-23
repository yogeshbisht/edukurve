import { BookMarkedIcon } from "lucide-react";
import React from "react";

const BrandLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <BookMarkedIcon className="size-6" />
      <span className="text-2xl font-bold">
        <span className="text-primary">edu</span>
        <span className="text-muted-foreground">kurve...</span>
      </span>
    </div>
  );
};

export default BrandLogo;
