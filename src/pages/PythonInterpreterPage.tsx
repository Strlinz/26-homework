import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PythonInterpreter from '../components/PythonInterpreter';

const PythonInterpreterPage: React.FC = () => {
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
            className="inline-flex items-center text-black hover:text-gray-800 mb-6"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">
              Python 解释器
            </h2>
            <p className="text-gray-600 mb-6">
              在这里运行Python代码，练习数据分析技巧
            </p>
            <PythonInterpreter />
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

export default PythonInterpreterPage;