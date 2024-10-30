import { useProjects } from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";

function ProjectList() {
  const { projects, error, loading, deleteProject, refreshProjects } =
    useProjects();

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      await refreshProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

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
    <>
      {projects.map((project) => (
        <div key={project.id} className="relative">
          <ProjectCard project={project} />
          <button
            onClick={() => project.id && handleDeleteProject(project.id)}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            aria-label="Delete project"
          >
            ×
          </button>
        </div>
      ))}
    </>
  );
}

export default ProjectList;
