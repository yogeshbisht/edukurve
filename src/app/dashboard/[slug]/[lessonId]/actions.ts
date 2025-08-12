"use server";

import { requireUser } from "@/data/user/require-user";
import { ApiResponse } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const markLessonComplete = async (
  lessonId: string,
  slug: string
): Promise<ApiResponse<void>> => {
  const user = await requireUser();

  try {
    await prisma.lessonProgress.upsert({
      where: {
        lessonId_userId: {
          lessonId,
          userId: user.id,
        },
      },
      update: {
        completed: true,
      },
      create: {
        lessonId: lessonId,
        userId: user.id,
        completed: true,
      },
    });

    revalidatePath(`/dashboard/${slug}`);

    return {
      status: "success",
      message: "Progress updated",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to mark lesson as complete",
    };
  }
};
