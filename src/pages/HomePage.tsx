import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">
            商务数据分析教学
          </h1>
          <div className="w-full md:w-1/3">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Python Interpreter Link */}
        <div className="mb-12">
          <Link to="/python" className="block bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-gray-400 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-black mb-2">
                  Python 解释器
                </h2>
                <p className="text-gray-600">
                  运行Python代码，练习数据分析技巧
                </p>
              </div>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Project List Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black mb-6">
            项目列表
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>商务数据分析教学内容 © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;