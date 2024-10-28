import { useProjects } from "../hooks/useProjects";
// import { format } from "date-fns";
// import { nb } from "date-fns/locale";
import ProjectList from "../Components/ProjectList";

function ProjectPage() {
  const { error, loading } = useProjects();

  if (loading) {
    return <p className="text-white font-bold">Laster Prosjekter...</p>;
  }

  if (error) {
    return <p className="text-white font-bold">{error}</p>;
  }

  return (
    <div className="flex flex-col text-white">
      <h1 className="text-white font-bold m-5 ">Projects</h1>
      <ProjectList />
    </div>
  );
}

export default ProjectPage;
