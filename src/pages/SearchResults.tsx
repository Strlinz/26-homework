import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { projects, Question } from '../data/projects';
import SearchBar from '../components/SearchBar';

interface SearchResult {
  projectId: string;
  projectTitle: string;
  question: Question;
  questionIndex: number;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      const searchResults: SearchResult[] = [];
      projects.forEach((project) => {
        project.questions.forEach((question, index) => {
          if (
            question.content.toLowerCase().includes(query.toLowerCase()) ||
            question.explanation.toLowerCase().includes(query.toLowerCase())
          ) {
            searchResults.push({
              projectId: project.id,
              projectTitle: project.title,
              question,
              questionIndex: index,
            });
          }
        });
      });
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

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
            返回首页
          </Link>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-4">
              搜索结果
            </h2>
            <p className="text-gray-600 mb-6">
              关于 "{query}" 的搜索结果
            </p>
            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors">
                    <Link
                      to={`/project/${result.projectId}`}
                      className="text-black hover:text-gray-800 font-medium mb-2 block"
                    >
                      {result.projectTitle}
                    </Link>
                    <div className="mb-2">
                      <span className="font-medium text-black">
                        问题 {result.questionIndex + 1}: 
                      </span>
                      <span className="text-gray-600">
                        {result.question.content}
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {result.question.explanation.substring(0, 100)}...
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  未找到与 "{query}" 相关的内容
                </p>
                <Link
                  to="/"
                  className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  浏览所有项目
                </Link>
              </div>
            )}
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

export default SearchResults;