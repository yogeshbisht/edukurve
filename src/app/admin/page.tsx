import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import EmptyState from "@/components/empty-state";
import SectionCards from "@/components/sidebar/section-cards";
import { adminGetEnrollmentStats } from "@/data/admin/admin-get-enrollment-stats";
import { adminGetRecentCourses } from "@/data/admin/admin-get-recent-courses";
import Link from "next/link";
import AdminCourseCard, {
  AdminCourseCardSkeleton,
} from "./courses/_components/admin-course-card";
import { Suspense } from "react";

const AdminPage = async () => {
  const enrollmentData = await adminGetEnrollmentStats();

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive enrollments={enrollmentData} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            <Link href="/admin/courses">View All Courses</Link>
          </h2>
        </div>

        <Suspense fallback={<RenderRecentCoursesSkeleton />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
};

const RenderRecentCourses = async () => {
  const courses = await adminGetRecentCourses();

  if (courses.length === 0) {
    return (
      <EmptyState
        buttonText="Create New Course"
        description="You don't have any courses. Create some to see them here."
        title="You don't have any courses yet!"
        buttonLink="/admin/courses/create"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <AdminCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

const RenderRecentCoursesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default AdminPage;
