import { getAllCourses } from "@/data/course/get-all-courses";
import PublicCourseCard, {
  PublicCourseCardSkeleton,
} from "../_components/public-course-card";
import { Suspense } from "react";

const CoursesPage = () => {
  return (
    <div className="mt-10">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-2xl font-bold">Courses</h1>
        <p className="text-sm text-muted-foreground">
          Explore our courses and start your learning journey today.
        </p>
      </div>
      <Suspense fallback={<RenderCoursesSkeleton />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
};

const RenderCourses = async () => {
  const courses = await getAllCourses();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

const RenderCoursesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <PublicCourseCardSkeleton key={`${index}-skeleton`} />
      ))}
    </div>
  );
};

export default CoursesPage;
