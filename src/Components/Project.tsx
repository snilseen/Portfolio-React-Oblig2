type ProjectProps = {
  title: string;
  description: string;
  techUsed: string;
  projectLink: string;
};

function Project(props: ProjectProps) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p>{props.techUsed}</p>
      <p>{props.projectLink}</p>
    </div>
  );
}

export default Project;
