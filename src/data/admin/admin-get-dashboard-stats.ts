import "server-only";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/prisma";

export const adminGetDashboardStats = async () => {
  await requireAdmin();

  const [totalSignUps, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: {
          enrollments: {
            some: {},
          },
        },
      }),

      prisma.course.count(),

      prisma.lesson.count(),
    ]);

  return {
    totalSignUps,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
};
