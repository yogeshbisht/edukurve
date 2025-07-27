import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, UploadIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mx-auto size-12 bg-muted rounded-full mb-4 ">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary animate-pulse"
          )}
        />
      </div>
      <h3 className="mt-2 text-sm font-semibold">No file uploaded</h3>
      <p className="text-xs text-muted-foreground">
        Drag and drop your file here or click to upload
      </p>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mx-auto size-12 bg-destructive/10 rounded-full mb-4 ">
        <ImageIcon className="size-6 text-destructive/80" />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-destructive">
        File type not supported
      </h3>
      <p className="text-xs text-muted-foreground">
        Please upload a PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX file
      </p>
      <Button variant="outline" size="sm" className="mt-4">
        <UploadIcon className="size-4 mr-2" />
        Try again
      </Button>
    </div>
  );
};
