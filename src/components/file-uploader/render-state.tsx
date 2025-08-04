import { cn } from "@/lib/utils";
import {
  CloudUploadIcon,
  ImageIcon,
  Loader2,
  UploadIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

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

export const RenderUploadingState = ({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) => {
  return (
    <div className="text-center flex justify-center items-center flex-col">
      <p>{progress}%</p>
      <p className="mt-2 text-sm font-medium text-foreground">
        Uploading {file.name}...
      </p>
      <p className="mt-1 truncate text-xs text-muted-foreground">{file.name}</p>
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
        Upload failed
      </h3>
      <p className="text-xs text-muted-foreground">Something went wrong</p>
      <Button type="button" variant="outline" size="sm" className="mt-4">
        <UploadIcon className="size-4 mr-2" />
        Try again
      </Button>
    </div>
  );
};

export const RenderUploadedState = ({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileType,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
  fileType: "image" | "video";
}) => {
  return (
    <div className="relative group size-full flex items-center justify-center">
      {fileType === "video" ? (
        <video className="rounded-md size-full" controls>
          <source src={previewUrl} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={previewUrl}
          alt="Uploaded File"
          fill
          className="object-contain p-2"
        />
      )}
      <Button
        variant="destructive"
        size="icon"
        className={cn(
          "absolute top-4 right-4",
          isDeleting && "cursor-not-allowed"
        )}
        onClick={handleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
};
