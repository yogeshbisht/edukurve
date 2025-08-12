"use client";

import { useMemo } from "react";
import { CourseSidebarDataType } from "@/data/course/get-course-sidebar-data";

interface CourseProgressResult {
  totalLessons: number;
  completedLessons: number;
  progress: number;
}

export const useCourseProgress = (
  courseData: CourseSidebarDataType
): CourseProgressResult => {
  return useMemo(() => {
    let totalLessons = 0;
    let completedLessons = 0;

    courseData.chapters.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        totalLessons++;

        const isCompleted = lesson.lessonProgress.some(
          (progress) => progress.lessonId === lesson.id && progress.completed
        );

        if (isCompleted) {
          completedLessons++;
        }
      });
    });

    const progress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    return {
      totalLessons,
      completedLessons,
      progress,
    };
  }, [courseData]);
};
