import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"];

export const courseStatus = ["Draft", "Published", "Archived"];

export const courseCategories = [
  "Programming & Tech",
  "Design & Multimedia",
  "Health & Fitness",
  "Personal Development",
  "Art & Creativity",
  "Science & Math",
  "History & Culture",
  "Language Learning",
  "Business & Entrepreneurship",
  "Music & Audio",
  "Photography & Video",
  "Writing & Publishing",
  "Other",
];

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  fileKey: z.string().min(1, { message: "File key is required" }),
  price: z.number().min(1, { message: "Price must be a positive number" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration must be less than 500 hours" }),
  level: z.enum(courseLevels, { message: "Invalid level" }),
  category: z.enum(courseCategories, { message: "Invalid category" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small description must be at least 3 characters" })
    .max(200, {
      message: "Small description must be less than 200 characters",
    }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .max(100, { message: "Slug must be less than 100 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be in kebab-case",
    }),
  status: z.enum(courseStatus, { message: "Invalid status" }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
