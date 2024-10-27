import type { MiddlewareHandler } from "hono";
import { getUser } from "../auth";
import { HTTPException } from "hono/http-exception";

// Middleware for autentisering
export const authenticate = (): MiddlewareHandler => {
  return async function authenticate(c, next) {
    const user = getUser(c.req.raw); // Hent bruker fra request (cookie)
    if (!user) throw new HTTPException(401); // Kaster 401 hvis ingen bruker finnes
    c.set("user", user); // Setter brukeren i context hvis den finnes
    await next(); // Fortsett til neste funksjon
  };
};
