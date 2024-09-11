type HeaderProps = {
  student: string;
  degree: string;
  points: number;
};

function Header(props: HeaderProps) {
  return (
    <div>
      <h1>{props.student}</h1>
      <p>
        {props.degree} {props.points} studiepoeng
      </p>
    </div>
  );
}

export default Header;
