import Header from "../Components/Header";
import Experiences from "../Components/Experiences";
import Projects from "../Components/Projects";
import CreateProject from "../Components/CreateProject";

type HomePageProps = {
  student: {
    name: string;
    degree: string;
    points: number;
    email: string;
    experiences: { name: string }[];
  };
  projects: { id: number; title: string; description: string }[];
  handleAddProject: (newProject: {
    title: string;
    description: string;
  }) => void;
  handleRemoveProject: (id: number) => void;
};

export default function HomePage({
  student,
  projects,
  handleAddProject,
  handleRemoveProject,
}: HomePageProps) {
  return (
    <main className="text-white">
      <Header student={student} />
      <Experiences experiences={student.experiences} />
      <Projects projects={projects} onRemoveProject={handleRemoveProject} />
      <CreateProject onAddProject={handleAddProject} />
    </main>
  );
}
