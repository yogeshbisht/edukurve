"use server";

import {
  ChapterSchemaType,
  chapterSchema,
  courseSchema,
  CourseSchemaType,
} from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/data/admin/require-admin";
import { ApiResponse } from "@/lib/types";
import { Chapter, Course, CourseLevel, CourseStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 2,
    })
  );

export const updateCourse = async (
  courseId: string,
  formData: CourseSchemaType
): Promise<ApiResponse<Course>> => {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Too many requests",
        };
      }
      return {
        status: "error",
        message:
          "You seem like a bot. If this is a mistake, please contact the support.",
      };
    }

    const result = courseSchema.safeParse(formData);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    const { data } = result;

    const course = await prisma.course.update({
      where: { id: courseId, authorId: session.user.id },
      data: {
        ...data,
        level: data.level as CourseLevel,
        status: data.status as CourseStatus,
      },
    });

    revalidatePath(`/admin/courses/${courseId}`);

    return {
      status: "success",
      message: "Course updated successfully",
      data: course,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to update course",
    };
  }
};

export const reorderLessons = async (
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string
): Promise<ApiResponse<Course>> => {
  await requireAdmin();

  try {
    if (!lessons?.length) {
      return {
        status: "error",
        message: "No lessons to reorder",
      };
    }

    const updates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: { id: lesson.id, chapterId },
        data: { position: lesson.position },
      })
    );

    await prisma.$transaction(updates);

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Lessons reordered successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to reorder lessons",
    };
  }
};

export const reorderChapters = async (
  chapters: { id: string; position: number }[],
  courseId: string
): Promise<ApiResponse<Course>> => {
  await requireAdmin();

  try {
    if (!chapters?.length) {
      return {
        status: "error",
        message: "No chapters to reorder",
      };
    }

    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: { id: chapter.id, courseId },
        data: { position: chapter.position },
      })
    );

    await prisma.$transaction(updates);

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Chapters reordered successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to reorder chapters",
    };
  }
};

export const createChapter = async (
  values: ChapterSchemaType
): Promise<ApiResponse<Chapter>> => {
  await requireAdmin();

  try {
    const result = chapterSchema.safeParse(values);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    await prisma.$transaction(async (tx) => {
      const maxPosition = await tx.chapter.findFirst({
        where: { courseId: result.data.courseId },
        select: { position: true },
        orderBy: { position: "desc" },
      });

      await tx.chapter.create({
        data: {
          title: result.data.name,
          courseId: result.data.courseId,
          position: (maxPosition?.position ?? 0) + 1,
        },
      });

      revalidatePath(`/admin/courses/${result.data.courseId}/edit`);
    });

    return {
      status: "success",
      message: "Chapter created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create chapter",
    };
  }
};
