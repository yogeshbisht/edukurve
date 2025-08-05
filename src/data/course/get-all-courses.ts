import { prisma } from "@/lib/prisma";

export const getAllCourses = async () => {
  const data = await prisma.course.findMany({
    where: { status: "Published" },
    select: {
      title: true,
      price: true,
      smallDescription: true,
      fileKey: true,
      slug: true,
      id: true,
      level: true,
      duration: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

export type GetAllCoursesType = Awaited<ReturnType<typeof getAllCourses>>[0];
