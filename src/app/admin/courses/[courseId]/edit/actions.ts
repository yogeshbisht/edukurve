"use server";

import {
  ChapterSchemaType,
  chapterSchema,
  courseSchema,
  CourseSchemaType,
  LessonSchemaType,
  lessonSchema,
} from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/data/admin/require-admin";
import { ApiResponse } from "@/lib/types";
import {
  Chapter,
  Course,
  CourseLevel,
  CourseStatus,
  Lesson,
} from "@/generated/prisma";
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

export const createLesson = async (
  values: LessonSchemaType
): Promise<ApiResponse<Lesson>> => {
  await requireAdmin();

  try {
    const result = lessonSchema.safeParse(values);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    await prisma.$transaction(async (tx) => {
      const maxPosition = await tx.lesson.findFirst({
        where: { chapterId: result.data.chapterId },
        select: { position: true },
        orderBy: { position: "desc" },
      });

      await tx.lesson.create({
        data: {
          title: result.data.title,
          chapterId: result.data.chapterId,
          position: (maxPosition?.position ?? 0) + 1,
          description: result.data.description,
          thumbnailKey: result.data.thumbnailKey,
          videoKey: result.data.videoKey,
        },
      });

      revalidatePath(`/admin/courses/${result.data.courseId}/edit`);
    });

    return {
      status: "success",
      message: "Lesson created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create lesson",
    };
  }
};

export const deleteChapter = async (
  chapterId: string,
  courseId: string
): Promise<ApiResponse<Chapter>> => {
  await requireAdmin();

  try {
    const courseWithChapters = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        chapters: {
          orderBy: { position: "asc" },
          select: { id: true, position: true },
        },
      },
    });

    if (!courseWithChapters) {
      return {
        status: "error",
        message: "Course not found",
      };
    }

    const chapters = courseWithChapters.chapters;
    const chapterToDelete = chapters.find(
      (chapter) => chapter.id === chapterId
    );

    if (!chapterToDelete) {
      return {
        status: "error",
        message: "Chapter not found",
      };
    }

    const remainingChapters = chapters.filter(
      (chapter) => chapter.id !== chapterId
    );

    const updates = remainingChapters.map((chapter, index) =>
      prisma.chapter.update({
        where: { id: chapter.id, courseId },
        data: { position: index + 1 },
      })
    );

    await prisma.$transaction([
      ...updates,
      prisma.chapter.delete({
        where: { id: chapterId, courseId },
      }),
    ]);

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Chapter deleted and positions updated successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete chapter",
    };
  }
};

export const deleteLesson = async (
  chapterId: string,
  courseId: string,
  lessonId: string
): Promise<ApiResponse<Lesson>> => {
  await requireAdmin();

  try {
    const chapterWithLessons = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: {
        lessons: {
          orderBy: { position: "asc" },
          select: { id: true, position: true },
        },
      },
    });

    if (!chapterWithLessons) {
      return {
        status: "error",
        message: "Chapter not found",
      };
    }

    const lessons = chapterWithLessons.lessons;
    const lessonToDelete = lessons.find((lesson) => lesson.id === lessonId);

    if (!lessonToDelete) {
      return {
        status: "error",
        message: "Lesson not found",
      };
    }

    const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);

    const updates = remainingLessons.map((lesson, index) =>
      prisma.lesson.update({
        where: { id: lesson.id, chapterId },
        data: { position: index + 1 },
      })
    );

    await prisma.$transaction([
      ...updates,
      prisma.lesson.delete({
        where: { id: lessonId, chapterId },
      }),
    ]);

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Lesson deleted and positions updated successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete lesson",
    };
  }
};
