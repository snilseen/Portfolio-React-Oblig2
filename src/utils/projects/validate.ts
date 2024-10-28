// import { z } from "zod";

//

// const projectSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   description: z.string(),
//   createdAt: z.string(),
//   category: z.string(),
//   link: z.string(),
//   public: z.boolean(),
// });

import { z } from "zod";

export const projectSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  category: z.string().nullable(),
  link: z.string().url("Invalid URL format").nullable(),
  public: z.union([z.boolean(), z.number()]).transform((val) => Boolean(val)),
  publishedAt: z.string().nullable(),
  status: z.enum(["active", "completed"]),
  tags: z
    .union([z.string().transform((str) => str.split(",")), z.array(z.string())])
    .transform((val) => (Array.isArray(val) ? val : [])),
});

export const projectsSchema = z.array(projectSchema);

// Utled type fra schema
export type Project = z.infer<typeof projectSchema>;
