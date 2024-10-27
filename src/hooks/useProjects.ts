import { useState, useEffect } from "react";
import type { Project } from "../types";
import { projectsURL } from "../config";
import { projectsSchema } from "../utils/projects/validate";
//import { getUser } from "../../backend/features/users/auth";
//import type { User } from "../..backend/features/types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // setter loadinga til true når vi først starter API-kallet.
      try {
        const response = await fetch(`${projectsURL}`, {
          credentials: "include",
        }); // Endret statisk variabel http://localhost:3000/projects
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        console.log("Raw data from server:", data);
        const parsedData = projectsSchema.parse(data.data);

        //setProjects(data);
        setProjects(parsedData);
        console.log(projectsSchema.safeParse(data));

        setError(null);
      } catch (err) {
        setError("Could not fetch projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false); // setter loadinga til false etter at kallet på setLoading er ferdig.
      }
    };

    fetchProjects();
  }, []);

  return { projects, error, loading };
}
