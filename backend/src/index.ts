import { serve } from "@hono/node-server";

import { Hono } from "hono";
import { cors } from "hono/cors";
import { projects } from "./projects";

const app = new Hono();

// bruker cors så jeg kan gjøre forespørsler fra frontend til backend, da disse ikke er på samme port.
app.use("*", cors({ origin: "http://localhost:5173" }));

// laget et endepunkt(en route) for å hente ut prosjektene

app.get("/projects", (c) => {
  return c.json(projects);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
