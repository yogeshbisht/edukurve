import React from "react";
import CourseSidebar from "../_components/course-sidebar";
import { getCourseSidebarData } from "@/data/course/get-course-sidebar-data";

interface CourseSlugPageProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const CourseSlugPage = async ({ children, params }: CourseSlugPageProps) => {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-1">
      <div className="w-80 border-r border-border shrink-0">
        <CourseSidebar course={course} />
      </div>

      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default CourseSlugPage;
