import RenderDescription from "@/components/rick-text-editor/render-description";
import { Button } from "@/components/ui/button";
import { LessonContent } from "@/data/course/get-lesson-content";
import { useConstructUrl } from "@/hooks/use-construct";
import { BookIcon, CheckCircleIcon } from "lucide-react";
import Image from "next/image";

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
  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer
        thumbnailKey={lesson.thumbnailKey ?? ""}
        videoKey={lesson.videoKey ?? ""}
      />

      <div className="py-4 border-b">
        <Button variant="outline">
          <CheckCircleIcon className="size-4 mr-2 text-green-500" />
          Mark as complete
        </Button>
      </div>

      <div className="space-y-3 pt-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {lesson.title}
        </h1>
        {lesson.description && (
          <RenderDescription json={JSON.parse(lesson.description)} />
        )}
      </div>
    </div>
  );
};

export default CourseContent;
