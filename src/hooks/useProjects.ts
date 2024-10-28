import { useState, useEffect } from "react";
//import type { Project } from "../types";
import { projectsURL } from "../config";
import { projectsSchema, type Project } from "../utils/projects/validate";
//import { getUser } from "../../backend/features/users/auth";
//import type { User } from "../..backend/features/types";

type ApiResponse = {
  success: boolean;
  data: Project[];
};
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(projectsURL, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const responseData = (await response.json()) as ApiResponse;
        console.log("Raw data from server:", responseData);

        const parsedData = projectsSchema.parse(responseData.data);
        setProjects(parsedData);
        setError(null);
      } catch (err) {
        setError("Could not fetch projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, error, loading };
}
