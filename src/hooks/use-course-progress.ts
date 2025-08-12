import { useMemo } from "react";
import { CourseSidebarDataType } from "@/data/course/get-course-sidebar-data";

interface CourseProgress {
  courseData: CourseSidebarDataType["course"];
}

export const useCourseProgress = (courseData: CourseProgress) => {
  return useMemo(() => {
    let totalLessons = 0;
    let completedLessons = 0;
  });
};
