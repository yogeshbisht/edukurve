"use server";

import { courseSchema, CourseSchemaType } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/data/admin/require-admin";
import { ApiResponse } from "@/lib/types";
import { Course, CourseLevel, CourseStatus } from "@/generated/prisma";
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
