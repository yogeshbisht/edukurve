import "server-only";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const adminGetCourse = async (courseId: string) => {
  await requireAdmin();

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      description: true,
      level: true,
      duration: true,
      fileKey: true,
      price: true,
      status: true,
      slug: true,
      category: true,
    },
  });

  if (!course) {
    return notFound();
  }

  return course;
};

export type AdminCourseSingularType = Awaited<
  ReturnType<typeof adminGetCourse>
>;
