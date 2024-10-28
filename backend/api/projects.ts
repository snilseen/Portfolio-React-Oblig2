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
  {
    title: "Task Management App",
    description:
      "A task management tool with project-based workflows and team collaboration features.",
    category: "Productivity",
    link: "https://example.com/task-manager",
    public: true,

    publishedAt: new Date("2022-12-15").toISOString(),
    status: "completed",
    tags: ["Angular", "Firebase", "TypeScript"],
  },
  {
    title: "Blogging Platform",
    description:
      "A platform for creating and sharing blog posts with a rich text editor and comment section.",
    category: "Content Creation",
    link: "https://example.com/blogging",
    public: true,

    publishedAt: new Date("2023-09-01").toISOString(),
    status: "active",
    tags: ["Next.js", "Prisma", "SQLite"],
  },
  {
    title: "Weather Forecast App",
    description:
      "An app that provides real-time weather forecasts for cities around the world.",
    category: "Utility",
    link: "https://example.com/weather",
    public: false,

    publishedAt: new Date("2023-04-01").toISOString(),
    status: "completed",
    tags: ["Vue.js", "APIs", "OpenWeatherMap"],
  },
];
