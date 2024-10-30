import { z } from "zod";

// Schema for input når man lager/oppdaterer et prosjekt
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

// Schema for hvordan data ser ut i databasen
export const projectDbSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  link: z.string().nullable(),
  public: z.number(), // 0 eller 1 i databasen
  status: z.string(),
  tags: z.string().nullable(), // Kommaseparert streng i databasen
  publishedAt: z.string().nullable(),
});

// Schema for hvordan data ser ut når vi sender det til frontend
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

// Eksporter types basert på schemaene
export type Project = z.infer<typeof projectSchema>;
export type ProjectFromDB = z.infer<typeof projectDbSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;
