import { useState, useEffect } from "react";
import type { Project } from "../types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // setter loadinga til true når vi først starter API-kallet.
      try {
        const response = await fetch("http://localhost:3000/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
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
