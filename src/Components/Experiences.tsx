import Experience from "./Experience";

type Experience = {
  name: string;
};

type ExperiencesProps = {
  experiences: Experience[];
};
export default function Experiences({ experiences }: ExperiencesProps) {
  return (
    <div>
      <h2>Experiences</h2>
      {experiences.map((experience, index) => (
        <Experience key={index} name={experience.name}>
          {/* Children for fleksibilitet - kan bruke mer enn bare navn
          <p>Additional details about {experience.name}</p> */}
        </Experience>
      ))}
    </div>
  );
}
