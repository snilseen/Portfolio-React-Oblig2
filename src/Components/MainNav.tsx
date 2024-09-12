function MainNav() {
  return (
    <nav className="max-w-screen-xl flex flex-row flex-wrap items-center justify-between mx-auto ">
      <a className="justify-start text-xl font-extrabold text-white" href="/">
        Sander Nilsen
      </a>
      <ul className="flex justify-end font-bold  no-underline text-white">
        <li className="mx-4">
          <a href="/about">About</a>
        </li>
        <li className="mx-4">
          <a href="/experience">Experience</a>
        </li>
        <li className="mx-4">
          <a href="/projects">Projects</a>
        </li>
        <li className="mx-4">
          <a href="/contact">Contact</a>
        </li>
        <li className="mx-4">
          <a href="/github">Github</a>
        </li>
        <li className="mx-4">
          <a href="/CV">CV</a>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
