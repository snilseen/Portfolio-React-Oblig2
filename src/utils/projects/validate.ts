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
export { projectSchema, projectsSchema };

const projectSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  link: z.string().url("Invalid URL format").optional(),
  public: z.boolean().optional(),
  createdAt: z.string().optional(),
  publishedAt: z.string().optional(),
  status: z.enum(["active", "completed"]).optional(),
  tags: z.array(z.string()).optional(),
});

const projectsSchema = z.array(projectSchema);
