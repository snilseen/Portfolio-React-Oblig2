import { z } from "zod";

// Skjema for data som er fra klienten
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  link: z.string().url("Invalid URL format").optional(),
  public: z.boolean().optional(),
  publishedAt: z.string().optional(),
  status: z.enum(["active", "completed"]).optional(),
  tags: z.array(z.string()).optional(),
});

// Type for data som kommer fra klienten
export type ProjectInput = z.infer<typeof projectSchema>;

// Schema for data som kommer fra databasen
export const projectDbSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  link: z.string().nullable(),
  public: z.number(), // 1 eller 0 i databasen
  createdAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
  status: z.enum(["active", "completed"]),
  tags: z.string().nullable(), // Kommaseparert streng i databasen
});

// Type for data som kommer fra databasen
export type ProjectDb = z.infer<typeof projectDbSchema>;

// Hjelpefunksjoner for å konvertere mellom formater
export const toDbFormat = (data: ProjectInput) => ({
  title: data.title,
  description: data.description ?? null,
  category: data.category ?? null,
  link: data.link ?? null,
  public: data.public ? 1 : 0,
  createdAt: new Date().toISOString(),
  publishedAt: data.publishedAt ?? null,
  status: data.status,
  tags: data.tags?.join(",") ?? null,
});

export const fromDbFormat = (data: ProjectDb) => ({
  ...data,
  public: data.public === 1,
  tags: data.tags ? data.tags.split(",") : [],
});
