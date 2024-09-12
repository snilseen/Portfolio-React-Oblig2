type HeaderProps = {
  student: {
    name: string;
    degree: string;
    points: number;
  };
};

function Header({ student }: HeaderProps) {
  return (
    <header>
      <h1>{student.name}</h1>
      <p>{student.degree}</p>
      <p>{student.points} studiepoeng</p>
    </header>
  );
}

export default Header;
