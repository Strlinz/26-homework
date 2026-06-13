import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import QuestionSection from '../components/QuestionSection';
import SearchBar from '../components/SearchBar';
import PythonInterpreter from '../components/PythonInterpreter';
import { usePoints } from '../context/PointsContext';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const { isProjectCompleted, markProjectCompleted, unmarkProjectCompleted, addPoints } = usePoints();
  const [interpreterCode, setInterpreterCode] = useState<string>('print("Hello, World!")');
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);
  const [showBonus, setShowBonus] = useState(false);

  const completed = project ? isProjectCompleted(project.id) : false;

  const handleToggleComplete = () => {
    if (!project) return;
    if (completed) {
      unmarkProjectCompleted(project.id);
    } else {
      markProjectCompleted(project.id);
      addPoints(20); // 完成项目奖励 20 分
      setShowBonus(true);
      setTimeout(() => setShowBonus(false), 2500);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <header className="bg-black text-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
              商务数据分析教学
            </Link>
            <div className="w-full md:w-1/3">
              <SearchBar />
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-5xl mb-4">🤔</div>
            <h2 className="text-xl font-semibold mb-4">项目不存在</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              您访问的项目不存在，请返回首页查看其他项目。
            </p>
            <Link
              to="/"
              className="inline-block bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-black text-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors text-center md:text-left">
            商务数据分析教学
          </Link>
          <div className="w-full md:w-1/3">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* 面包屑 */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center flex-wrap gap-1">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            首页
          </Link>
          <span>/</span>
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            项目列表
          </Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200 font-medium">{project.title}</span>
        </nav>

        {/* 标题 & 完成按钮 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.description}</p>
            </div>
            <div className="flex-shrink-0 relative">
              <button
                onClick={handleToggleComplete}
                className={`px-5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  completed
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700'
                    : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {completed ? '✓ 已完成（点击取消）' : '✓ 标记完成（+20 积分）'}
              </button>
              {showBonus && (
                <div className="absolute right-0 -bottom-8 text-sm text-green-600 dark:text-green-400 font-bold animate-bounce whitespace-nowrap">
                  🎉 +20 积分！
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800">
          {/* 教学内容 */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
              <span>📖</span>
              学习内容
            </h3>
            <div className="space-y-4">
              {project.teaching?.map((section, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {index + 1}. {section.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-sm">
                    {section.content}
                  </p>
                  {section.code && (
                    <div className="mt-4">
                      <button
                        onClick={() => setInterpreterCode(section.code!)}
                        className="text-xs px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mb-3"
                      >
                        📋 复制到编译器
                      </button>
                      <pre className="bg-black dark:bg-gray-950 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono leading-relaxed">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 共享的Python解释器 */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
              <span>🐍</span>
              Python 编译器
            </h3>
            <PythonInterpreter code={interpreterCode} onCodeChange={setInterpreterCode} />
          </div>

          {/* 练习题（可折叠） */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => setIsQuestionsOpen(!isQuestionsOpen)}
              className="w-full flex justify-between items-center p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-xl mr-2">✍️</span>
                <h3 className="text-xl font-semibold">练习题</h3>
                <span className="ml-3 px-2 py-1 text-xs bg-black dark:bg-white text-white dark:text-black rounded">
                  {project.questions.length} 题
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
                  isQuestionsOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isQuestionsOpen && (
              <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                {project.questions.map((question, index) => (
                  <QuestionSection
                    key={question.id}
                    question={question}
                    index={index}
                    onLoadCode={setInterpreterCode}
                    projectId={project.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 底部导航 */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <Link
            to="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← 返回项目列表
          </Link>
          <button
            onClick={handleToggleComplete}
            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
              completed
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {completed ? '✓ 已完成此项目' : '✓ 标记此项目为完成（+20 积分）'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 dark:bg-gray-900 border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>商务数据分析教学内容 © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetails;
