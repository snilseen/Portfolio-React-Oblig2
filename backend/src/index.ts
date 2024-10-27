import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { projectSchema } from "./db/schema/projectValidation";
import { authenticate } from "../features/users/utils/middleware";
import { projectsTable } from "./db/schema/projects";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db/config";

// Initialiser Hono-app
const app = new Hono();

// Middleware for CORS og autentisering
app.use("*", cors({ origin: "http://localhost:5173", credentials: true }));

// **GET /api/projects** – Hent alle prosjekter
app.get("/api/projects", authenticate(), async (c) => {
  try {
    const projects = await db.select().from(projectsTable).all();
    return c.json({ data: projects });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch projects" }, 500);
  }
});

// **GET /api/projects** – Hent alle prosjekter
app.get("/api/projects", authenticate(), async (c) => {
  try {
    const projects = await db.select().from(projectsTable);

    // Konverter tags fra string til array før sending til klient
    const formattedProjects = projects.map((project) => ({
      ...project,
      tags: project.tags ? project.tags.split(",") : [],
    }));

    return c.json({ data: formattedProjects });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch projects" }, 500);
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

// **POST /api/projects** – Opprett nytt prosjekt
app.post("/api/projects", authenticate(), async (c) => {
  try {
    const data = projectSchema.parse(await c.req.json());

    await db.insert(projectsTable).values({
      title: data.title,
      description: data.description,
      category: data.category,
      link: data.link,
      public: data.public, // Drizzle håndterer boolean-konvertering
      createdAt: new Date().toISOString(),
      publishedAt: data.publishedAt || null,
      status: data.status || "active",
      tags: data.tags ? data.tags.join(",") : null,
    });

    return c.json(
      {
        message: "Project created successfully",
        success: true,
      },
      201
    );
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return c.json(
        {
          error: "Validation failed",
          details: error.errors,
          success: false,
        },
        400
      );
    }
    return c.json(
      {
        error: "Failed to create project",
        success: false,
      },
      500
    );
  }
});

// **PUT /api/projects/:id** – Oppdater prosjekt
app.put("/api/projects/:id", authenticate(), async (c) => {
  const id = Number(c.req.param("id"));
  try {
    const data = projectSchema.parse(await c.req.json());

    await db
      .update(projectsTable)
      .set({
        title: data.title,
        description: data.description,
        category: data.category,
        link: data.link,
        public: data.public, // Drizzle håndterer boolean-konvertering
        publishedAt: data.publishedAt || null,
        status: data.status || "active",
        tags: data.tags ? data.tags.join(",") : null,
      })
      .where(eq(projectsTable.id, id));

    return c.json({
      message: "Project updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return c.json(
        {
          error: "Validation failed",
          details: error.errors,
          success: false,
        },
        400
      );
    }
    return c.json(
      {
        error: "Failed to update project",
        success: false,
      },
      500
    );
  }
});

// **DELETE /api/projects/:id** – Slett prosjekt
app.delete("/api/projects/:id", authenticate(), async (c) => {
  const id = Number(c.req.param("id"));
  try {
    await db.delete(projectsTable).where(eq(projectsTable.id, id));

    return c.json({
      message: "Project deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return c.json(
      {
        error: "Failed to delete project",
        success: false,
      },
      500
    );
  }
});

// Start serveren
const port = 3000;
console.log(`Server is running on port ${port}`);
serve({ fetch: app.fetch, port });
