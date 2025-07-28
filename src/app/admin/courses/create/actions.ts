"use server";

import { courseSchema, CourseSchemaType } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import z from "zod";
import { Course, CourseLevel, CourseStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { ApiResponse } from "@/lib/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createCourse(
  formData: CourseSchemaType
): Promise<ApiResponse<Course>> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        status: "error",
        message: "You must be logged in to create a course",
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
