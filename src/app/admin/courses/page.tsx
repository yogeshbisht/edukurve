import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import AdminCourseCard, {
  AdminCourseCardSkeleton,
} from "./_components/admin-course-card";
import { adminGetCourses } from "@/data/admin/admin-get-courses";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import EmptyState from "@/components/empty-state";

const AdminCoursePage = async () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/admin/courses/create"
        >
          <IconPlus />
          Create Course
        </Link>
      </div>
      <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </>
  );
};

const RenderCourses = async () => {
  const data = await adminGetCourses();

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Create a course to get started"
          buttonText="Create Course"
          buttonLink="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((course) => (
            <AdminCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
};

const AdminCourseCardSkeletonLayout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default AdminCoursePage;
