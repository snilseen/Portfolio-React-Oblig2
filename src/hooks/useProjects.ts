import { useState, useEffect } from "react";
//import type { Project } from "../types";
import { projectsURL } from "../config";
import { projectsSchema, type Project } from "../utils/projects/validate";
//import { getUser } from "../../backend/features/users/auth";
//import type { User } from "../..backend/features/types";

type ApiResponse = {
  success: boolean;
  data: Project[] | Project;
  error?: string;
};

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(projectsURL);

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const responseData = (await response.json()) as ApiResponse;
      console.log("Response from server:", responseData);

      if (!responseData.success) {
        throw new Error(responseData.error || "Failed to fetch projects");
      }

      // Valider data med Zod schema
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

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (newProject: Omit<Project, "id">) => {
    try {
      console.log("Sending project data:", newProject);

      const response = await fetch(projectsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to create project");
      }

      // Oppdater prosjektlisten
      await fetchProjects();
      return responseData.data;
    } catch (err) {
      console.error("Error creating project:", err);
      setError(err instanceof Error ? err.message : "Failed to create project");
      throw err;
    }
  };

  const deleteProject = async (id: number) => {
    try {
      console.log("Deleting project:", id);

      const response = await fetch(`${projectsURL}/${id}`, {
        method: "DELETE",
      });

      console.log("Delete response status:", response.status);
      const responseData = await response.json();
      console.log("Delete response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to delete project");
      }

      // Oppdater prosjektlisten
      await fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError(err instanceof Error ? err.message : "Failed to delete project");
      throw err;
    }
  };

  const updateProject = async (id: number, updates: Partial<Project>) => {
    try {
      console.log("Updating project:", id, "with data:", updates);

      const response = await fetch(`${projectsURL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      console.log("Update response status:", response.status);
      const responseData = await response.json();
      console.log("Update response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to update project");
      }

      // Oppdater prosjektlisten
      await fetchProjects();
      return responseData.data;
    } catch (err) {
      console.error("Error updating project:", err);
      setError(err instanceof Error ? err.message : "Failed to update project");
      throw err;
    }
  };
  return {
    projects,
    error,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refreshProjects: fetchProjects,
  };
}
