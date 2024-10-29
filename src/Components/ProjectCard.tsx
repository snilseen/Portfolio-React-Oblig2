import { Project } from "../utils/projects/validate";
import { format } from "date-fns";
interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {project.title}
          </h3>
        </div>

        {project.description && (
          <p className="text-gray-600 mb-4">{project.description}</p>
        )}

        {project.category && (
          <div className="mb-3">
            <span className="text-sm text-gray-500">Category:</span>
            <span className="ml-2 text-gray-700">{project.category}</span>
          </div>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm mb-3 block"
          >
            View Project →
          </a>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span
            className={`text-sm ${
              project.public ? "text-green-600" : "text-gray-500"
            }`}
          >
            {project.public ? "Public" : "Private"}
          </span>
          <span
            className={`px-2 py-1 rounded text-sm ${
              project.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {project.status}
          </span>
          {project.publishedAt && (
            <span className="text-sm text-gray-500">
              {format(new Date(project.publishedAt), "dd/MM/yyyy")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
