import "server-only";

import { requireUser } from "../user/require-user";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const getCourseSidebarData = async (slug: string) => {
  const user = await requireUser();

  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      fileKey: true,
      level: true,
      slug: true,
      duration: true,
      category: true,
      chapters: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      courseId_userId: {
        courseId: course.id,
        userId: user.id,
      },
    },
  });

  if (!enrollment || enrollment.status !== "Active") {
    return notFound();
  }

  return course;
};

export type CourseSidebarDataType = Awaited<
  ReturnType<typeof getCourseSidebarData>
>;
