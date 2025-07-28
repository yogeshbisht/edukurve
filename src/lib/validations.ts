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
    .min(3, { error: "Title must be at least 3 characters" })
    .max(100, { error: "Title must be less than 100 characters" }),
  description: z
    .string()
    .min(3, { error: "Description must be at least 3 characters" })
    .max(1000, { error: "Description must be less than 1000 characters" }),
  fileKey: z.string().min(1, { error: "File key is required" }),
  price: z.coerce.number().min(1, { error: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { error: "Duration must be at least 1 hour" })
    .max(500, { error: "Duration must be less than 500 hours" }),
  level: z.enum(courseLevels, { error: "Invalid level" }),
  category: z.enum(courseCategories, { error: "Invalid category" }),
  smallDescription: z
    .string()
    .min(3, { error: "Small description must be at least 3 characters" })
    .max(200, {
      error: "Small description must be less than 200 characters",
    }),
  slug: z
    .string()
    .min(3, { error: "Slug must be at least 3 characters" })
    .max(100, { error: "Slug must be less than 100 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      error: "Slug must be in kebab-case",
    }),
  status: z.enum(courseStatus, { error: "Invalid status" }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
