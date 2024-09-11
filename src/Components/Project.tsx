type ProjectProps = {
  title: string;
};

function Project(props: ProjectProps) {
  return <div>{props.title}</div>;
}

export default Project;
