"use server";

import { requireAdmin } from "@/data/admin/require-admin";
import { Lesson } from "@/generated/prisma";
import { ApiResponse } from "@/lib/types";
import { lessonSchema, LessonSchemaType } from "@/lib/validations";

export const updateLesson = async (
  lessonId: string,
  data: LessonSchemaType
): Promise<ApiResponse<Lesson>> => {
  await requireAdmin();

  try {
    const result = lessonSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    await prisma?.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: data.title,
        description: data.description,
        thumbnailKey: data.thumbnailKey,
        videoKey: data.videoKey,
      },
    });

    return {
      status: "success",
      message: "Lesson updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to update lesson",
    };
  }
};
