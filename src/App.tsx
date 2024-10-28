import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNav from "./Components/MainNav";
import HomePage from "./Pages/HomePage";
import ContactPage from "./Pages/ContactPage";
import ProjectPage from "./Pages/ProjectPage";

function App() {
  type StudentType = {
    name: string;
    degree: string;
    points: number;
    email: string;
    experiences: { name: string }[];
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

  return (
    <div>
      <Router>
        <MainNav />
        <Routes>
          <Route path="/" element={<HomePage student={student} />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/contact" element={<ContactPage student={student} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
