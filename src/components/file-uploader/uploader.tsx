"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./render-state";
import { toast } from "sonner";
import { FileRejection } from "react-dropzone";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useConstructUrl } from "@/hooks/use-construct";

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
interface UploaderProps {
  value?: string;
  onChange?: (value: string) => void;
}

const Uploader = ({ value, onChange }: UploaderProps) => {
  const fileUrl = useConstructUrl(value || "");
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    error: false,
    fileType: "image",
    key: value,
    objectUrl: fileUrl,
  });

  const handleFileUpload = async (file: File) => {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error("Failed to get presigned URL");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
          objectUrl: undefined,
        }));

        return;
      }

      const data = await presignedResponse.json();

      const { presignedUrl, key } = data;

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              uploading: false,
              progress: 100,
              key,
            }));

            onChange?.(key);

            toast.success("File uploaded successfully");

            resolve();
          } else {
            reject(new Error("Failed to upload file"));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Failed to upload file"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      toast.error("Failed to upload file");
      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: true,
        objectUrl: undefined,
      }));
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

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

        handleFileUpload(file);
      }
    },
    [fileState.objectUrl]
  );

  const handleDeleteFile = async () => {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const deleteResponse = await fetch(`/api/s3/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });

      if (!deleteResponse.ok) {
        toast.error("Failed to delete file");

        setFileState((prev) => ({
          ...prev,
          isDeleting: true,
          error: true,
        }));

        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");

      setFileState(() => ({
        isDeleting: false,
        file: null,
        objectUrl: undefined,
        key: undefined,
        fileType: "image",
        id: null,
        uploading: false,
        progress: 0,
        error: false,
      }));

      toast.success("File deleted successfully");
    } catch (error) {
      toast.error("Failed to delete file");

      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  };

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
        toast.error("File size must be less than 1MB");
      }
    }
  };

  const renderContent = () => {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleDeleteFile}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  };

  // prevent memory leak
  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 1, // 1MB
    onDropRejected,
    disabled: fileState.uploading || !!fileState.objectUrl,
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
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default Uploader;
