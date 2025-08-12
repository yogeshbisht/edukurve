"use client";

import TextEditor from "@/components/rich-text-editor/text-editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AdminGetLessonResponse } from "@/data/admin/admin-get-lesson";
import { lessonSchema, LessonSchemaType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Loader2Icon, SaveIcon } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import FileUploader from "@/components/file-uploader/uploader";
import { tryCatch } from "@/hooks/try-catch";
import { updateLesson } from "../action";
import { toast } from "sonner";

interface LessonFormProps {
  chapterId: string;
  courseId: string;
  lesson: AdminGetLessonResponse;
}

const LessonForm = ({ chapterId, lesson, courseId }: LessonFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson.title,
      courseId,
      chapterId,
      description: lesson.description ?? undefined,
      thumbnailKey: lesson.thumbnailKey ?? undefined,
      videoKey: lesson.videoKey ?? undefined,
    },
  });

  const onSubmit = async (values: LessonSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        updateLesson(lesson.id, values)
      );

      if (error) {
        toast.error("Something unexpected happened");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-6" })}
        href={`/admin/courses/${courseId}/edit`}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to course
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
          <CardDescription>Configure the video and description</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter lesson title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <TextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnailKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onChange={field.onChange}
                        fileTypeAccepted="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video File</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onChange={field.onChange}
                        fileTypeAccepted="video"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    <span>Save Lesson Details</span>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonForm;
