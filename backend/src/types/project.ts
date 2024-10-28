export interface Project {
  id: number;
  title: string;
  description?: string | null;
  category?: string | null;
  link?: string | null;
  public: boolean;
  status: string;
  tags: string[];
  publishedAt?: string | null;
}
