import { useProjects } from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";

function ProjectList() {
  const { projects, error, loading } = useProjects();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md">
        <p className="text-gray-600">No projects found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id || `${project.title}-${project.publishedAt}`}
          project={project}
        />
      ))}
    </div>
  );
}

export default ProjectList;
