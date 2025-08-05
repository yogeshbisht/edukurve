"use server";

import { courseSchema, CourseSchemaType } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import z from "zod";
import { Course, CourseLevel, CourseStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { ApiResponse } from "@/lib/types";
import { requireAdmin } from "@/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 2,
  })
);

export async function createCourse(
  formData: CourseSchemaType
): Promise<ApiResponse<Course>> {
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

    const validatedFields = courseSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        status: "error",
        message: z.treeifyError(validatedFields.error).toString(),
      };
    }

    const { level, status, ...rest } = validatedFields.data;

    const course = await prisma.course.create({
      data: {
        ...rest,
        authorId: session.user.id,
        level: level as CourseLevel,
        status: status as CourseStatus,
      },
    });

    revalidatePath("/admin/courses");

    return {
      status: "success",
      data: course,
      message: "Course created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
