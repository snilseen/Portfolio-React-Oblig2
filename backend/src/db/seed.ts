import db from "./db";
import { createProjectsTable } from "./tables";

function seedProjects() {
  // Opprett tabellen først
  createProjectsTable();

  // Tøm eksisterende data
  db.prepare("DELETE FROM projects").run();

  // Legg inn testdata
  const projects = [
    {
      title: "Demo Project 1",
      description: "This is a demo project",
      category: "Web",
      link: "https://example.com",
      public: 1,
      status: "active",
      tags: "web,demo,test",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Demo Project 2",
      description: "Another demo project",
      category: "Mobile",
      public: 0,
      status: "completed",
      tags: "mobile,demo",
      publishedAt: new Date().toISOString(),
    },
  ];

  const insert = db.prepare(`
    INSERT INTO projects (title, description, category, link, public, status, tags, publishedAt)
    VALUES (@title, @description, @category, @link, @public, @status, @tags, @publishedAt)
  `);

  projects.forEach((project) => insert.run(project));

  console.log("Database seeded!");
}

// Kjør seeding hvis denne filen kjøres direkte
if (require.main === module) {
  seedProjects();
}
