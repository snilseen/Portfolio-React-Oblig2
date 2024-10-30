// Dummy prosjektdata
export const projects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio showcasing my projects and blogs.",
    category: "Web Development",
    link: "https://example.com/portfolio",
    public: true,

    publishedAt: new Date("2023-02-01").toISOString(),
    status: "completed",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce site with shopping cart, checkout, and admin panel.",
    category: "E-commerce",
    link: "https://example.com/ecommerce",
    public: false,

    publishedAt: new Date("2023-06-01").toISOString(),
    status: "active",
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
];
