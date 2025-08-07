"use client";

import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { enrollInCourse } from "../action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface EnrollmentButtonProps {
  courseId: string;
}

const EnrollmentButton = ({ courseId }: EnrollmentButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleEnroll = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(enrollInCourse(courseId));

      if (error) {
        toast.error("An unexpected error occurred");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button onClick={handleEnroll} disabled={isPending} className="w-full">
      {isPending ? (
        <>
          <Loader2Icon className="size-4 animate-spin" />
          Enrolling...
        </>
      ) : (
        "Enroll Now"
      )}
    </Button>
  );
};

export default EnrollmentButton;
