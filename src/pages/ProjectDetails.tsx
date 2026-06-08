import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import QuestionSection from '../components/QuestionSection';
import SearchBar from '../components/SearchBar';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
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
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-black mb-4">
              项目不存在
            </h2>
            <p className="text-gray-600 mb-6">
              您访问的项目不存在，请返回首页查看其他项目。
            </p>
            <Link
              to="/"
              className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </main>
        <footer className="bg-black border-t border-gray-800 py-6 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>商务数据分析教学内容 © 2026</p>
          </div>
        </footer>
      </div>
    );
  }

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
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-black hover:text-gray-800 mb-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回项目列表
          </Link>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-4">
              {project.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {project.description}
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-black mb-4">
                问题与答案
              </h3>
              {project.questions.map((question, index) => (
                <QuestionSection
                  key={question.id}
                  question={question}
                  index={index}
                />
              ))}
            </div>
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

export default ProjectDetails;