import Experience from "./Experience";

type Experience = {
  name: string;
};

type ExperiencesProps = {
  experiences: Experience[];
};
function Experiences({ experiences }: ExperiencesProps) {
  if (experiences.length === 0) {
    return <p>Ingen erfaringer</p>;
  }

  return (
    <div>
      <h2>Experiences:</h2>
      {experiences.map((experience, index) => (
        <Experience key={index} name={experience.name} />
      ))}
    </div>
  );
}

export default Experiences;
