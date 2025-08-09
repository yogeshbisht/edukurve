import "server-only";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const getCourseBySlug = async (slug: string) => {
  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      title: true,
      fileKey: true,
      smallDescription: true,
      level: true,
      duration: true,
      category: true,
      price: true,
      slug: true,
      id: true,
      description: true,
      chapters: {
        select: {
          id: true,
          title: true,
          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  return course;
};
