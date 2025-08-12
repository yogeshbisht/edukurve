import "server-only";

import { prisma } from "@/lib/prisma";
import { requireUser } from "./require-user";

export const getEnrolledCourses = async () => {
  const user = await requireUser();

  const courses = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "Active",
    },
    select: {
      course: {
        select: {
          id: true,
          title: true,
          fileKey: true,
          level: true,
          slug: true,
          smallDescription: true,
          chapters: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      id: true,
                      completed: true,
                      lessonId: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return courses;
};

export type EnrolledCourseType = Awaited<
  ReturnType<typeof getEnrolledCourses>
>[0];
