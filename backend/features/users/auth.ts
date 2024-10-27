import { users } from "../../data/users";
import type { User } from "../types";

const parseCookie = (cookie: string) => {
  return Object.fromEntries(
    cookie.split(";").map((cookie) => cookie.trim().split("="))
  );
};

export function getUser(request: Request): User | null {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "");

  const id = cookies["user.id"];
  const role = cookies["user.role"] || "user"; // Standard til "user" hvis ingen rolle er satt

  const user = users.find((user) => user.id === id) ?? null;
  return user ? { ...user, role } : null;
}
