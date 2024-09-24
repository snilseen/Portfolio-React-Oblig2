import { useState, useEffect } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  category: string;
};

function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 1.4 Fetch projects from the server
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/projects"); // Ensure the correct backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError("Could not fetch projects");
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-white font-bold m-5 ">Projects</h1>
      {error && <p>{error}</p>}
      {projects.length === 0 ? (
        <p>No projects available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {/* Her bruker vi grid med 3 kolonner */}
          {projects.map((project) => (
            <div
              className="bg-white shadow-sm border border-slate-200 rounded-lg p-4"
              key={project.id}
            >
              <h2 className="font-bold text-lg">{project.title}</h2>
              <p>{project.description}</p>
              <p>Category: {project.category}</p>
              <p>Created at: {project.createdAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
