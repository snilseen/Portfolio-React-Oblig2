import "./App.css";
import Contact from "./Components/Contact";
import Experiences from "./Components/Experiences";
import Header from "./Components/Header";
import MainNav from "./Components/MainNav";
import Projects from "./Components/Projects";

function App() {
  type Experience = {
    name: string;
  };

  type Project = {
    id: number;
    title: string;
    description: string;
  };

  type StudentType = {
    name: string;
    degree: string;
    points: number;
    email: string;
    experiences: Experience[];
  };

  const student: StudentType = {
    name: "Sander Nilsen",
    degree: "Bachelor IT",
    points: 180,
    email: "student@hiof.no",
    experiences: [
      { name: "Figma UI for customer X" },
      { name: "Website for customer Y" },
    ],
  };
  const projects: Project[] = [
    {
      id: 1,
      title: "Project 1",
      description: "Jobbet med blablabla",
    },
    {
      id: 2,
      title: "Project 2",
      description: "Jobbet med blablabla",
    },
    {
      id: 3,
      title: "Project 3",
      description: "Jobbet med blablabla",
    },
    {
      id: 4,
      title: "Project 4",
      description: "Jobbet med blablabla",
    },
  ];

  return (
    <div>
      <MainNav />
      <main className="text-white">
        <Header student={student} />
        <Experiences experiences={student.experiences} />
        <Projects projects={projects} />
        <Contact student={student} />
      </main>
    </div>
  );
}

export default App;
