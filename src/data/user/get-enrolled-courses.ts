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
          duration: true,
          chapters: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
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
