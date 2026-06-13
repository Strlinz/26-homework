import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { usePoints } from '../context/PointsContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { isProjectCompleted } = usePoints();
  const completed = isProjectCompleted(project.id);

  return (
    <Link to={`/project/${project.id}`} className="block group relative">
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 ${
          completed ? 'ring-2 ring-green-500 dark:ring-green-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-950' : ''
        }`}
      >
        {completed && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-1 rounded-full">
            <span>✓</span>
            <span>已完成</span>
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 pr-20 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 font-medium">
          <span>{completed ? '继续学习' : '查看详情'}</span>
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
