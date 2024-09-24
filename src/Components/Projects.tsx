import Project from "./Project";

type Project = {
  id: number;
  title: string;
  description: string;
};

type ProjectsProps = {
  projects: Project[];
  onRemoveProject: (id: number) => void;
};

export default function Projects({ projects, onRemoveProject }: ProjectsProps) {
  if (projects.length === 0) {
    return <p>Ingen prosjekter</p>;
  }
  return (
    <div>
      <h2>Totalt antall prosjekter: {projects.length}</h2> {/* Oppsummering */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col flex-wrap border-2 border-solid rounded  border-white"
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <button
            onClick={() => onRemoveProject(project.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Fjern prosjekt
          </button>
        </div>
      ))}
    </div>
  );
}
