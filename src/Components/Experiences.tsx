type ExperienceProps = {
  experienceOne: string;
  experienceTwo: string;
};

function Experiences(props: ExperienceProps) {
  return (
    <div>
      <p>{props.experienceOne}</p>
      <p>{props.experienceTwo}</p>
    </div>
  );
}

export default Experiences;
