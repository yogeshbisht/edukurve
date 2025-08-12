import React, { Suspense } from "react";
import { getLessonContent } from "@/data/course/get-lesson-content";
import CourseContent from "./_components/course-content";
import { Skeleton } from "@/components/ui/skeleton";

type Params = Promise<{
  lessonId: string;
}>;

const LessonContentPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonContentLoaderSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
};

const LessonContentLoader = async ({ lessonId }: { lessonId: string }) => {
  const lesson = await getLessonContent(lessonId);

  return <CourseContent lesson={lesson} />;
};

// TODO: improve this skeleton
const LessonContentLoaderSkeleton = () => {
  return (
    <div className="flex flex-col h-full pl-6">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <Skeleton className="size-full" />
      </div>
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-5/24" />
        </div>
      </div>
    </div>
  );
};

export default LessonContentPage;
