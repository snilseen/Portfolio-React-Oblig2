// types.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  link: string;
  public: boolean;
  createdAt: string;
  publishedAt: string | null; // mulig null hvis det ikke er publisert
  status: "completed" | "active" | "pending";
  tags: string[]; // array av tagger som string
}
