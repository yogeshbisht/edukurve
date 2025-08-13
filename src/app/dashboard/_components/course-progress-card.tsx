"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { EnrolledCourseType } from "@/data/user/get-enrolled-courses";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { Progress } from "@/components/ui/progress";

const CourseProgressCard = ({ data }: { data: EnrolledCourseType }) => {
  const { course } = data;
  const thumbnailUrl = useConstructUrl(course.fileKey);
  const { completedLessons, totalLessons, progress } =
    useCourseProgress(course);

  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{course.level}</Badge>
      <Image
        width={600}
        height={400}
        src={thumbnailUrl}
        alt={course.title}
        className="w-full h-full aspect-video object-cover"
      />
      <CardContent className="p-4">
        <Link
          href={`/dashboard/${course.slug}`}
          className="group-hover:text-primary font-medium text-lg line-clamp-2"
        >
          {course.title}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2 landing-tight">
          {course.smallDescription}
        </p>
        <div className="space-y-4 mt-4">
          <div className="flex justify-between mb-1 text-sm">
            <p className="mb-0.5">Progress:</p>
            <p className="font-medium">{progress}%</p>
          </div>
          <Progress value={progress} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>
        <Link
          href={`/dashboard/${course.slug}`}
          className={buttonVariants({
            className: "mt-4 w-full",
          })}
        >
          View Course
        </Link>
      </CardContent>
    </Card>
  );
};

export const PublicCourseCardSkeleton = () => {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="w-full relative h-fit">
        <Skeleton className="w-full rounded-t-xl aspect-video" />
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div className="mt-4 flex items-center gap-x-5">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={`${index}-skeleton`}
              className="flex items-center gap-x-2"
            >
              <Skeleton className="size-6 rounded-md" />
              <Skeleton className="h-6 w-8" />
            </div>
          ))}
        </div>

        <Skeleton className="h-10 w-full mt-4 rounded-md" />
      </CardContent>
    </Card>
  );
};

export default CourseProgressCard;
