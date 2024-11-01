import db from "./db";

function seedProjects() {
  db.prepare("DELETE FROM projects").run();

  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio showcasing my projects and blogs.",
      category: "Web Development",
      link: "https://google.com",
      public: 1,
      status: "completed",
      publishedAt: new Date().toISOString(),
      tags: "HTML,CSS,JavaScript",
    },
    {
      title: "Task Manager",
      description: "A simple task management application.",
      category: "Application",
      link: "https://google.com",
      public: 1,
      status: "active",
      publishedAt: new Date().toISOString(),
      tags: "React,TypeScript,Node",
    },
    {
      title: "Task Manager",
      description: "A simple task management application.",
      category: "Application",
      link: "https://google.com",
      public: 1,
      status: "active",
      publishedAt: new Date().toISOString(),
      tags: "React,TypeScript,Node",
    },
    {
      title: "Task Manager",
      description: "A simple task management application.",
      category: "Application",
      link: "https://google.com",
      public: 1,
      status: "active",
      publishedAt: new Date().toISOString(),
      tags: "React,TypeScript,Node",
    },
    {
      title: "Task Manager",
      description: "A simple task management application.",
      category: "Application",
      link: "https://google.com",
      public: 1,
      status: "active",
      publishedAt: new Date().toISOString(),
      tags: "React,TypeScript,Node",
    },
    {
      title: "Task Manager",
      description: "A simple task management application.",
      category: "Application",
      link: "https://google.com",
      public: 1,
      status: "active",
      publishedAt: new Date().toISOString(),
      tags: "React,TypeScript,Node",
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO projects (
      title, description, category, link, public, status, publishedAt, tags
    ) VALUES (
      @title, @description, @category, @link, @public, @status, @publishedAt, @tags
    )
  `);

  for (const project of projects) {
    try {
      stmt.run(project);
      console.log(`Added project: ${project.title}`);
    } catch (error) {
      console.error(`Failed to add project ${project.title}:`, error);
    }
  }

  console.log("Seeding completed!");
}

// Kjør seeding hvis denne filen kjøres direkte
if (require.main === module) {
  seedProjects();
}

export { seedProjects };
