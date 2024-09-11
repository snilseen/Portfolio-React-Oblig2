import "./App.css";
import Contact from "./Components/Contact";
import Experiences from "./Components/Experiences";
import Header from "./Components/Header";
import Projects from "./Components/Projects";

function App() {
  const student = "Halgeir Geirson";
  const degree = "Bachelor IT";
  const points = 180;
  const experienceOne = "Figma UI for customer X";
  const experienceTwo = "Website for customer Y";
  const email = "student@hiof.no";

  return (
    <div>
      <Header student={student} degree={degree} points={points} />
      <Experiences
        experienceOne={experienceOne}
        experienceTwo={experienceTwo}
      />
      <Contact email={email} />

      <Projects />
    </div>
  );
}

export default App;
