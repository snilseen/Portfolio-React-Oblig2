type ExperienceProps = {
  name: string;
  children?: React.ReactNode;
};

function Experience({ name }: ExperienceProps) {
  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
}

export default Experience;
