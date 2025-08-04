"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/data/admin/require-admin";
import { revalidatePath } from "next/cache";

export const deleteCourse = async (courseId: string) => {
  await requireAdmin();

  try {
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    revalidatePath("/admin/courses");

    return {
      status: "success",
      message: "Course deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete course",
    };
  }
};
