import "server-only";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/prisma";

export const adminGetEnrollmentStats = async () => {
  await requireAdmin();

  const thirtyDaysAgo = new Date();

  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const enrollments = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const last30Days: { date: string; enrollment: number }[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    last30Days.push({
      date: date.toISOString().split("T")[0],
      enrollment: 0,
    });
  }

  enrollments.forEach((enrollment) => {
    const enrollmentDate = enrollment.createdAt.toISOString().split("T")[0];

    const dayIndex = last30Days.findIndex((day) => day.date === enrollmentDate);

    if (dayIndex !== -1) {
      last30Days[dayIndex].enrollment++;
    }
  });

  return last30Days;
};
