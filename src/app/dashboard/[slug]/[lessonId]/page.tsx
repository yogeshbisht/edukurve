import React from "react";
import { getLessonContent } from "@/data/course/get-lesson-content";
import CourseContent from "./_components/course-content";

type Params = Promise<{
  lessonId: string;
}>;

const LessonContentPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;
  const lesson = await getLessonContent(lessonId);

  return (
    <div>
      <CourseContent lesson={lesson} />
    </div>
  );
};

export default LessonContentPage;
