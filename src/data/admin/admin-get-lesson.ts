import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const adminGetLesson = async (lessonId: string) => {
  await requireAdmin();

  const lesson = await prisma.lesson.findUnique({
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
    },
  });

  if (!lesson) {
    return notFound();
  }

  return lesson;
};

export type AdminGetLessonResponse = Awaited<ReturnType<typeof adminGetLesson>>;
