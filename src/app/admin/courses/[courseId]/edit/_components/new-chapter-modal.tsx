import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { chapterSchema, ChapterSchemaType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createChapter } from "../actions";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";

interface NewChapterModalProps {
  courseId: string;
}

const NewChapterModal = ({ courseId }: NewChapterModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChapterSchemaType>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      courseId,
      name: "",
    },
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const onSubmit = (values: ChapterSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createChapter(values));
      if (error) {
        toast.error("An unexpected error occurred");
        return;
      }

      if (result.status === "success") {
        form.reset();
        setIsOpen(false);
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <PlusIcon className="size-4" /> New Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Chapter</DialogTitle>
          <DialogDescription>
            Create a new chapter for your course.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Chapter Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-2">
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Creating..." : "Create Chapter"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewChapterModal;
