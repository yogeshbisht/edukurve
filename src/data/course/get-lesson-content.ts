import "server-only";

import { requireUser } from "../user/require-user";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const getLessonContent = async (lessonId: string) => {
  const user = await requireUser();

  const lesson = await prisma?.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnailKey: true,
      videoKey: true,
      position: true,
      chapter: {
        select: {
          courseId: true,
        },
      },
    },
  });

  if (!lesson) {
    return notFound();
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      courseId_userId: {
        courseId: lesson.chapter.courseId,
        userId: user.id,
      },
    },
    select: {
      status: true,
    },
  });

  if (!enrollment || enrollment.status !== "Active") {
    return notFound();
  }

  return lesson;
};

export type LessonContent = Awaited<ReturnType<typeof getLessonContent>>;
