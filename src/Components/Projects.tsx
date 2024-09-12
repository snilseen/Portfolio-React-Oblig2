import Project from "./Project";

type Project = {
  id: number;
  title: string;
  description: string;
};

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div>
      {projects.map((project) => (
        <Project
          key={project.id}
          title={project.title}
          description={project.description}
        />
      ))}
    </div>
  );
}
