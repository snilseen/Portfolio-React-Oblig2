import { useProjects } from "../hooks/useProjects";

function ProjectPage() {
  const { projects, error, loading } = useProjects();

  if (loading) {
    return <p className="text-white font-bold">Laster Prosjekter...</p>;
  }

  if (error) {
    return <p className="text-white font-bold">{error}</p>;
  }

  return (
    <div className="flex flex-col text-white">
      <h1 className="text-white font-bold m-5 ">Projects</h1>
      {error && <p>{error}</p>}
      {projects.length === 0 ? (
        <p>Ingen prosjekter tilgjengelig.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              className="bg-white text-black shadow-sm border border-slate-200 rounded-lg p-4"
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
