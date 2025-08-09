"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/data/admin/require-admin";
import { revalidatePath } from "next/cache";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";
import { returnErrorMessage } from "@/lib/utils";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 2,
  })
);

export const deleteCourse = async (courseId: string) => {
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
      } else {
        return {
          status: "error",
          message: "You are not authorized to delete this course",
        };
      }
    }

    if (decision.isDenied()) {
      return {
        status: "error",
        message:
          "You seem like a bot. If this is a mistake, please contact the support.",
      };
    }

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
      message: returnErrorMessage(error),
    };
  }
};
