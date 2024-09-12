type ExperienceProps = {
  name: string;

  children?: React.ReactNode;
};

function Experience({ name, children }: ExperienceProps) {
  return (
    <div>
      <h3>{name}</h3>

      {children}
    </div>
  );
}

export default Experience;
