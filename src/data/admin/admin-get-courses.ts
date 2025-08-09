import "server-only";

import { prisma } from "@/lib/prisma";

export const adminGetCourses = async () => {
  const data = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      smallDescription: true,
      status: true,
      duration: true,
      level: true,
      price: true,
      fileKey: true,
    },
  });

  return data;
};

export type AdminGetCoursesType = Awaited<
  ReturnType<typeof adminGetCourses>
>[0];
