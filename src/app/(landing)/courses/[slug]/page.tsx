import Image from "next/image";
import { getCourseBySlug } from "@/data/course/get-course";
import { useConstructUrl } from "@/hooks/use-construct";
import { Badge } from "@/components/ui/badge";
import {
  IconBook,
  IconCategory,
  IconChartBar,
  IconChevronDown,
  IconClock,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import RenderDescription from "@/components/rick-text-editor/render-description";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { CheckIcon, Link } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { checkIfCourseBought } from "@/data/user/user-is-enrolled";
import EnrollmentButton from "./_components/enrollment-button";

type Params = Promise<{ slug: string }>;

const CoursePage = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const course = await getCourseBySlug(slug as string);
  const thumbnailUrl = useConstructUrl(course.fileKey);

  const isEnrolled = await checkIfCourseBought(course.id);

  const getLessonCount = () => {
    const lessonCount =
      course.chapters.reduce(
        (total, chapter) => total + chapter.lessons.length,
        0
      ) || 0;
    return `${lessonCount} Lesson${lessonCount > 1 ? "s" : ""}`;
  };

  const enrollmentFeatures = [
    {
      icon: IconClock,
      label: "Course Duration",
      value: `${course.duration} hours`,
    },
    {
      icon: IconChartBar,
      label: "Difficulty Level",
      value: course.level,
    },
    {
      icon: IconCategory,
      label: "Category",
      value: course.category,
    },
    {
      icon: IconBook,
      label: "Total Lessons",
      value: getLessonCount(),
    },
  ];

  const courseIncludes = [
    {
      label: "Full lifetime access",
    },
    {
      label: "Access on mobile and desktop",
    },
    {
      label: "Certificate of completion",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-8 lg:grid-cols-3">
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">
              {course.smallDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge className="flex items-center gap-1 px-3 py-1.5">
              <IconChartBar className="size-4" />
              <span>{course.level}</span>
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1.5">
              <IconBook className="size-4" />
              <span>{course.category}</span>
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1.5">
              <IconClock className="size-4" />
              <span>{course.duration}h</span>
            </Badge>
          </div>

          <Separator className="my-8" />

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Description
            </h2>
            <RenderDescription json={JSON.parse(course.description)} />
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Content
            </h2>
            <div>
              {course.chapters.length} Chapters | {getLessonCount()}
            </div>
          </div>

          <div className="space-y-4">
            {course.chapters.map((chapter, index) => (
              <Collapsible key={chapter.id} defaultOpen={index === 0}>
                <Card className="p-0 overflow-hidden border-2 transition-all duration-200 hover:shadow-md gap-0">
                  <CollapsibleTrigger>
                    <div>
                      <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                              {index + 1}
                            </p>
                            <div>
                              <h3 className="text-xl font-semibold text-left">
                                {chapter.title}
                              </h3>
                              <p className="text-sm text-muted-foreground text-left mt-1">
                                {chapter.lessons.length} lesson
                                {chapter.lessons.length > 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              {chapter.lessons.length} lesson
                              {chapter.lessons.length > 1 ? "s" : ""}
                            </Badge>

                            <IconChevronDown className="size-4 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-5 bg-muted/20">
                      <div className="p-6 pt-4 space-y-3">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent group transition-colors"
                          >
                            <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 border-muted">
                              <IconPlayerPlay className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Lesson {lessonIndex + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
      {/* EnrollmentCard */}
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="py-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium">Price:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(course.price)}
                </span>
              </div>

              <div className="mb-6 space-y-3 rounded-lg bg-muted p-4">
                <h4 className="font-medium">What you will get:</h4>
                <div className="flex flex-col gap-3">
                  {enrollmentFeatures.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-3"
                    >
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <feature.icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{feature.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {feature.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <h4 className="font-medium">This course includes:</h4>
                <ul className="space-y-2">
                  {courseIncludes.map((include) => (
                    <li
                      key={include.label}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="rounded-full bg-green-500/10 text-green-500">
                        <CheckIcon className="size-3" />
                      </div>
                      <span>{include.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {isEnrolled ? (
                <Link
                  href={`/dashboard/courses/${course.id}`}
                  className={cn(buttonVariants, "w-full")}
                >
                  View Course
                </Link>
              ) : (
                <EnrollmentButton courseId={course.id} />
              )}
              <p className="mt-3 text-center text-xs text-muted-foreground">
                30-Day Money Back Guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
