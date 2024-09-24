import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainNav from "./Components/MainNav";

import HomePage from "./Pages/HomePage";
import ContactPage from "./Pages/ContactPage";

function App() {
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
  const [projects, setProjects] = useState<Project[]>([
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
  ]);

  const handleAddProject = (newProject: {
    title: string;
    description: string;
  }) => {
    const newId =
      projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;
    setProjects([...projects, { id: newId, ...newProject }]);
  };

  const handleRemoveProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div>
      <Router>
        <MainNav />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                student={student}
                projects={projects}
                handleAddProject={handleAddProject}
                handleRemoveProject={handleRemoveProject}
              />
            }
          />
          <Route path="/contact" element={<ContactPage student={student} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
