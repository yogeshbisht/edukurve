import React from "react";
import { getCourseSidebarData } from "@/data/course/get-course-sidebar-data";
import { redirect } from "next/navigation";

interface CourseSlugPageProps {
  params: Promise<{ slug: string }>;
}

const CourseSlugPage = async ({ params }: CourseSlugPageProps) => {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  const firstChapter = course.chapters[0];
  const firstLesson = firstChapter.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }

  return (
    <div className="flex items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold mb-2">No lessons found</h2>
      <p className="text-muted-foreground">
        This course doesn&apos;t have any lessons yet. Please check back later.
      </p>
    </div>
  );
};

export default CourseSlugPage;
