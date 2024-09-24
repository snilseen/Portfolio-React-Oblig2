type ProjectProps = {
  title: string;
  description: string;
};

export default function Project({ title, description }: ProjectProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
