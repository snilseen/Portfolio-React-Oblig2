type ProjectProps = {
  title: string;
  description: string;
};

export default function Project({ title, description }: ProjectProps) {
  return (
    <article className="flex flex-col flex-wrap border-2 border-solid rounded  border-white">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
