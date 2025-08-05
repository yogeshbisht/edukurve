import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { GetAllCoursesType } from "@/data/course/get-all-courses";
import { useConstructUrl } from "@/hooks/use-construct";
import Image from "next/image";
import Link from "next/link";
import { SchoolIcon, TimerIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface PublicCourseCardProps {
  course: GetAllCoursesType;
}

const PublicCourseCard = ({ course }: PublicCourseCardProps) => {
  const thumbnailUrl = useConstructUrl(course.fileKey);

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
          href={`/courses/${course.slug}`}
          className="group-hover:text-primary font-medium text-lg line-clamp-2"
        >
          {course.title}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2 landing-tight">
          {course.smallDescription}
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <span className="text-sm text-muted-foreground">
              {course.duration}h
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <SchoolIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <span className="text-sm text-muted-foreground">
              {course.category}
            </span>
          </div>
        </div>
        <Link
          href={`/courses/${course.slug}`}
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

export default PublicCourseCard;
