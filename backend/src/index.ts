import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { projectSchema } from "./db/schema/projectValidation";
import { authenticate } from "../features/users/utils/middleware";
import { projectsTable } from "./db/schema/projects";
import { z } from "zod";
import { db } from "./db/config";

// Initialiser Hono-app
const app = new Hono();

// Middleware for CORS og autentisering
app.use("*", cors({ origin: "http://localhost:5173", credentials: true }));

// Hent alle prosjekter
app.get("/api/projects", (c) => {
  try {
    const projects = db.prepare("SELECT * FROM projects").all();
    return c.json({
      success: true,
      data: projects.map((project) => ({
        ...project,
        tags: project.tags ? JSON.parse(project.tags) : [],
      })),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Failed to fetch projects",
      },
      500
    );
  }
});

// Hent alle prosjekter
app.get("/api/projects", (c) => {
  try {
    const projects = db.prepare("SELECT * FROM projects").all();
    return c.json({
      success: true,
      data: projects.map((project) => ({
        ...project,
        tags: project.tags ? JSON.parse(project.tags) : [],
      })),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Failed to fetch projects",
      },
      500
    );
  }
});

// **GET /api/projects/:id** – Hent ett spesifikt prosjekt
app.get("/api/projects/:id", authenticate(), async (c) => {
  const id = Number(c.req.param("id"));
  try {
    const project = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id));

    if (!project || project.length === 0) {
      return c.json({ error: "Project not found" }, 404);
    }

    // Konverter tags fra string til array
    const formattedProject = {
      ...project[0],
      tags: project[0].tags ? project[0].tags.split(",") : [],
    };

    return c.json({ data: formattedProject });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch project" }, 500);
  }
});

// Opprett nytt prosjekt
app.post("/api/projects", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = projectSchema.parse(body);

    const stmt = db.prepare(`
      INSERT INTO projects (id, title, description, category, link, public, publishedAt, status, tags)
      VALUES (@id, @title, @description, @category, @link, @public, @publishedAt, @status, @tags)
    `);

    const project = {
      id: crypto.randomUUID(),
      ...validatedData,
      tags: validatedData.tags ? JSON.stringify(validatedData.tags) : null,
    };

    stmt.run(project);

    return c.json(
      {
        success: true,
        data: {
          ...project,
          tags: validatedData.tags || [],
        },
      },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: error.errors[0].message,
        },
        400
      );
    }

    return c.json(
      {
        success: false,
        error: "Failed to create project",
      },
      500
    );
  }
});

// Oppdater prosjekt
app.patch("/api/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    // Bygg update query dynamisk basert på hvilke felter som er inkludert
    const updates = Object.keys(body)
      .map(key => `${key} = @${key}`)
      .join(", ");

    const stmt = db.prepare(`
      UPDATE projects 
      SET ${updates}
      WHERE id = @id
    `);

    const result = stmt.run({
      id,
      ...body,
      tags: body.tags ? JSON.stringify(body.tags) : undefined
    });

    if (result.changes === 0) {
      return c.json({
        success: false,
        error: "Project not found"
      }, 404);
});

// Slett prosjekt
app.delete("/api/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    const result = db.prepare("DELETE FROM projects WHERE id = ?").run(id);
    
    if (result.changes === 0) {
      return c.json({
        success: false,
        error: "Project not found"
      }, 404);
    }

    return c.json({
      success: true,
      data: "Project deleted successfully"
    });
  } catch (error) {
    return c.json({
      success: false,
      error: "Failed to delete project"
    }, 500);
  }
});

// Start serveren
const port = 3000;
console.log(`Server is running on port ${port}`);
serve({ fetch: app.fetch, port });
