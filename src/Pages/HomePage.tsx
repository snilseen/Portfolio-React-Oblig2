import Header from "../Components/Header";
import Experiences from "../Components/Experiences";

type HomePageProps = {
  student: {
    name: string;
    degree: string;
    points: number;
    email: string;
    experiences: { name: string }[];
  };
};

export default function HomePage({ student }: HomePageProps) {
  return (
    <main className="text-white">
      <Header student={student} />
      <Experiences experiences={student.experiences} />
    </main>
  );
}
