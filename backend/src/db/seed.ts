import "dotenv/config";
import { db } from "./config";
import { projectsTable } from "./schema/projects";

async function main() {
  try {
    // Eksempeldata for prosjektet
    const project = {
      title: "My Awesome Project",
      description: "A comprehensive project example using Drizzle ORM.",
      createdAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      category: "Web Development",
      link: "https://example.com",
      public: true,
      status: "active",
      tags: ["typescript", "drizzle-orm", "sqlite"].join(","), // Lagre som kommaseparert streng
    };

    // Sett inn prosjektet i `projectsTable`
    await db.insert(projectsTable).values(project);
    console.log("New project created!");

    // Hent alle prosjekter for å bekrefte
    const projects = await db.select().from(projectsTable);
    console.log("Current projects in the database: ", projects);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log("Database seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
