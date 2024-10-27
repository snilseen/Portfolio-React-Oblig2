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
