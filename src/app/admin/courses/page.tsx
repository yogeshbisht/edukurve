import { buttonVariants } from "@/components/ui/button";
import AdminCourseCard from "./_components/admin-course-card";
import { adminGetCourses } from "@/data/admin/admin-get-courses";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

const AdminCoursePage = async () => {
  const data = await adminGetCourses();

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((course) => (
          <AdminCourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export default AdminCoursePage;
