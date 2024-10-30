import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  link: z.string().url().optional(),
  public: z.boolean().default(false),
  status: z.string().optional(),
  tags: z.array(z.string()).optional(),
  publishedAt: z.string().optional(),
});

export const projectDbSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  link: z.string().nullable(),
  public: z.number(),
  status: z.string(),
  tags: z.string().nullable(),
  publishedAt: z.string().nullable(),
});

export const projectResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  link: z.string().nullable(),
  public: z.boolean(),
  status: z.string(),
  tags: z.array(z.string()),
  publishedAt: z.string().nullable(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFromDB = z.infer<typeof projectDbSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;
