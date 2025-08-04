"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import React, { useTransition } from "react";
import { deleteCourse } from "./action";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DeleteCoursePage = () => {
  const [isPending, startTransition] = useTransition();
  const { courseId } = useParams();

  const handleDelete = async () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteCourse(courseId as string)
      );

      if (error) {
        toast.error("Something went wrong");
        return;
      }

      if (result.status === "success") {
        toast.success("Course deleted successfully");
        redirect("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto w-full mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>
          <CardDescription>This action cannot be undone.</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end gap-x-2">
          <Link
            href={`/admin/courses`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "text-sm text-muted-foreground flex items-center gap-x-2 w-40"
            )}
          >
            Cancel
          </Link>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="w-40"
          >
            {isPending ? (
              <>
                <Loader2Icon className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <TrashIcon className="w-4 h-4" />
                Delete Course
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteCoursePage;
