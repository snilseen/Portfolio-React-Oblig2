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
    return <p className="mt-7">Ingen prosjekter</p>;
  }
  return (
    <>
      <h2 className="mt-7">Totalt antall prosjekter: {projects.length}</h2>
      <div className="flex flex-row mt-3 justify-center gap-5 flex-wrap">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col border-2 border-solid rounded max-w-60 border-white p-4"
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button
              onClick={() => onRemoveProject(project.id)}
              className="inline-block text-xs mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-26 self-center "
            >
              Fjern prosjekt
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
