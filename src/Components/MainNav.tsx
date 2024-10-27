import { Link } from "react-router-dom";

function MainNav() {
  return (
    <nav className="max-w-screen-xl flex flex-row flex-wrap items-center justify-between mx-auto ">
      <Link className="justify-start text-xl font-extrabold text-white" to="/">
        Sander Nilsen
      </Link>
      <ul className="flex justify-end font-bold no-underline text-white mx-4">
        <li className="mx-4">
          <Link to="/about">About</Link>
        </li>
        <li className="mx-4">
          <Link to="/experience">Experience</Link>
        </li>
        <li className="mx-4">
          <Link to="/projects">Projects</Link>
        </li>
        <li className="mx-4">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="mx-4">
          <Link to="/github">Github</Link>
        </li>
        <li className="mx-4">
          <Link to="/CV">CV</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
