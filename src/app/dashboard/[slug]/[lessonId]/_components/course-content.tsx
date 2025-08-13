"use client";

import { Button } from "@/components/ui/button";
import { LessonContent } from "@/data/course/get-lesson-content";
import { useConstructUrl } from "@/hooks/use-construct";
import { BookIcon, CheckCircleIcon } from "lucide-react";
import { markLessonComplete } from "../actions";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";

const VideoPlayer = ({
  thumbnailKey,
  videoKey,
}: {
  thumbnailKey: string;
  videoKey: string;
}) => {
  const videoUrl = useConstructUrl(videoKey);
  const thumbnailUrl = useConstructUrl(thumbnailKey);

  if (!videoKey) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
        <BookIcon className="size-16 text-primary mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">No video available</p>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
      <video
        src={videoUrl}
        className="size-full object-cover"
        controls
        poster={thumbnailUrl}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        <p className="text-sm text-muted-foreground">
          Your browser does not support the video tag.
        </p>
      </video>
    </div>
  );
};

const CourseContent = ({ lesson }: { lesson: LessonContent }) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(lesson.id, lesson.chapter.course.slug)
      );

      if (error) {
        toast.error("Something unexpected happened");
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
    <>
      <VideoPlayer
        thumbnailKey={lesson.thumbnailKey ?? ""}
        videoKey={lesson.videoKey ?? ""}
      />

      <div className="py-4 border-b">
        {lesson.lessonProgress.length > 0 ? (
          <Button
            variant="outline"
            className="bg-green-500/10 text-green-500 hover:text-green-600"
          >
            <CheckCircleIcon className="size-4 mr-2 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button variant="outline" onClick={onSubmit} disabled={isPending}>
            <CheckCircleIcon className="size-4 mr-2 text-green-500" />
            Mark as complete
          </Button>
        )}
      </div>
    </>
  );
};

export default CourseContent;
