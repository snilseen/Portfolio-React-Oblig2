import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  projectSchema,
  projectDbSchema,
  projectResponseSchema,
} from "./db/schema/projectValidation";
import db from "./db/db";
import { createProjectsTable } from "./db/tables";
import { z } from "zod";

const app = new Hono();
app.use("*", cors({ origin: "http://localhost:5173", credentials: true }));

createProjectsTable();

app.get("/api/projects", (c) => {
  try {
    const projects = db.prepare("SELECT * FROM projects").all();
    console.log("Projects from database:", projects);
    return c.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Database error:", error);
    return c.json(
      {
        success: false,
        error: "Failed to fetch projects",
      },
      500
    );
  }
});

app.get("/api/projects/:id", (c) => {
  try {
    const id = Number(c.req.param("id"));
    const result = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);

    if (!result) {
      return c.json(
        {
          success: false,
          error: "Project not found",
        },
        404
      );
    }

    const dbProject = projectDbSchema.parse(result);

    const responseProject = projectResponseSchema.parse({
      ...dbProject,
      public: Boolean(dbProject.public),
      tags: dbProject.tags ? dbProject.tags.split(",") : [],
    });

    return c.json({
      success: true,
      data: responseProject,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: "Invalid data format in database",
        },
        500
      );
    }

    return c.json(
      {
        success: false,
        error: "Failed to fetch project",
      },
      500
    );
  }
});

app.post("/api/projects", async (c) => {
  try {
    const body = await c.req.json();
    const project = projectSchema.parse(body);

    const dbProject = db
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

    const validatedDbProject = projectDbSchema.parse(dbProject);

    const responseProject = projectResponseSchema.parse({
      ...validatedDbProject,
      public: Boolean(validatedDbProject.public),
      tags: validatedDbProject.tags ? validatedDbProject.tags.split(",") : [],
    });

    return c.json({
      success: true,
      data: responseProject,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof z.ZodError
            ? error.errors[0].message
            : "Failed to create project",
      },
      400
    );
  }
});

app.patch("/api/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updates = projectSchema.partial().parse(body);

    const fields = Object.keys(updates);
    const updates_sql = fields
      .map((field) => `${field} = @${field}`)
      .join(", ");

    const dbProject = db
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

    if (!dbProject) {
      return c.json(
        {
          success: false,
          error: "Project not found",
        },
        404
      );
    }

    const validatedDbProject = projectDbSchema.parse(dbProject);

    const responseProject = projectResponseSchema.parse({
      ...validatedDbProject,
      public: Boolean(validatedDbProject.public),
      tags: validatedDbProject.tags ? validatedDbProject.tags.split(",") : [],
    });

    return c.json({
      success: true,
      data: responseProject,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof z.ZodError
            ? error.errors[0].message
            : "Failed to update project",
      },
      400
    );
  }
});

app.delete("/api/projects/:id", (c) => {
  try {
    const id = Number(c.req.param("id"));

    const exists = db.prepare("SELECT id FROM projects WHERE id = ?").get(id);

    if (!exists) {
      return c.json(
        {
          success: false,
          error: "Project not found",
        },
        404
      );
    }

    db.prepare("DELETE FROM projects WHERE id = ?").run(id);

    return c.json({
      success: true,
      data: null,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Failed to delete project",
      },
      500
    );
  }
});

const port = 3999;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});
