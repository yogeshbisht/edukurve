"use client";

import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { RenderEmptyState, RenderErrorState } from "./render-state";
import { toast } from "sonner";
import { FileRejection } from "react-dropzone";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType?: "image" | "video";
}

const Uploader = () => {
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    error: false,
    fileType: "image",
  });

  // TODO: Implement file upload
  const handleFileUpload = (acceptedFiles: File[]) => {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const fileType = file.type.split("/")[0];
      setFileState({
        ...fileState,
        id: uuidv4(),
        file,
        uploading: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
        isDeleting: false,
        fileType: "image",
      });
    }
  }, []);

  const onDropRejected = (fileRejections: FileRejection[]) => {
    if (fileRejections.length) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      if (tooManyFiles) {
        toast.error("You can only upload one file at a time");
      }

      const fileSizeTooLarge = fileRejections.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (fileSizeTooLarge) {
        toast.error("File size must be less than 5MB");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 5, // 5MB
    onDropRejected,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center h-full">
        <input {...getInputProps()} className="hidden" />
        <RenderEmptyState isDragActive={isDragActive} />
      </CardContent>
    </Card>
  );
};

export default Uploader;
