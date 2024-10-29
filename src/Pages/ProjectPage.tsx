import { useProjects } from "../hooks/useProjects";

import ProjectList from "../Components/ProjectList";
import { ProjectForm } from "../Components/ProjectForm";
import Layout from "../Components/Layout";

function ProjectPage() {
  const { error, loading, createProject } = useProjects();

  if (loading) {
    return <p className="text-white font-bold">Laster Prosjekter...</p>;
  }

  if (error) {
    return <p className="text-white font-bold">{error}</p>;
  }

  return (
    <div className="flex flex-col text-white">
      <h1 className="text-white font-bold m-5 ">Projects</h1>
      <Layout>
        <ProjectList />
      </Layout>
      <ProjectForm onAddProject={createProject} />
    </div>
  );
}

export default ProjectPage;
