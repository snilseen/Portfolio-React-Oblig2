// src/index.ts
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { projectSchema } from "./db/schema/projectValidation";
import db from "./db/db";
import { createProjectsTable } from "./db/tables";

const app = new Hono();
app.use("*", cors());

// Opprett tabellen ved oppstart
createProjectsTable();

// Hent alle prosjekter
app.get("/api/projects", (c) => {
  const projects = db.prepare("SELECT * FROM projects").all();
  return c.json({
    success: true,
    data: projects.map((p) => ({
      ...p,
      public: Boolean(p.public),
      tags: p.tags ? p.tags.split(",") : [],
    })),
  });
});

// Opprett nytt prosjekt
app.post("/api/projects", async (c) => {
  try {
    const body = await c.req.json();
    const project = projectSchema.parse(body);

    const result = db
      .prepare(
        `
      INSERT INTO projects (title, description, category, link, public, status, tags, publishedAt)
      VALUES (@title, @description, @category, @link, @public, @status, @tags, @publishedAt)
      RETURNING *
    `
      )
      .get({
        ...project,
        public: project.public ? 1 : 0,
        tags: project.tags?.join(","),
      });

    return c.json({
      success: true,
      data: {
        ...result,
        public: Boolean(result.public),
        tags: result.tags ? result.tags.split(",") : [],
      },
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create project",
      },
      400
    );
  }
});

// Slett prosjekt
app.delete("/api/projects/:id", (c) => {
  const id = c.param("id");
  const result = db.prepare("DELETE FROM projects WHERE id = ?").run(id);

  if (result.changes === 0) {
    return c.json(
      {
        success: false,
        error: "Project not found",
      },
      404
    );
  }

  return c.json({ success: true });
});

// Oppdater prosjekt
app.patch("/api/projects/:id", async (c) => {
  try {
    const id = c.param("id");
    const body = await c.req.json();
    const updates = projectSchema.partial().parse(body);

    // Bygg update query
    const fields = Object.keys(updates);
    const updates_sql = fields
      .map((field) => `${field} = @${field}`)
      .join(", ");

    const result = db
      .prepare(
        `
      UPDATE projects 
      SET ${updates_sql}
      WHERE id = @id
      RETURNING *
    `
      )
      .get({
        id,
        ...updates,
        public:
          updates.public !== undefined ? (updates.public ? 1 : 0) : undefined,
        tags: updates.tags?.join(","),
      });

    if (!result) {
      return c.json(
        {
          success: false,
          error: "Project not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: {
        ...result,
        public: Boolean(result.public),
        tags: result.tags ? result.tags.split(",") : [],
      },
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update project",
      },
      400
    );
  }
});

// Start server

const port = 3000;

serve({
  fetch: app.fetch,
  port: 3000,
});
console.log(`Server is running on port${port}`);
