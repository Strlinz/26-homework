import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { glossary, GLOSSARY_CATEGORIES, GlossaryTerm } from '../data/glossary';
import SearchBar from '../components/SearchBar';

const GlossaryPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  const filtered = useMemo<GlossaryTerm[]>(() => {
    const q = query.trim().toLowerCase();
    return glossary.filter((t) => {
      const matchQuery =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      const matchCategory = activeCategory === '全部' || t.category === activeCategory;
      return matchQuery && matchCategory;
    });
  }, [query, activeCategory]);

  // 按分类聚合展示
  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    for (const t of filtered) {
      if (!map[t.category]) map[t.category] = [];
      map[t.category].push(t);
    }
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="bg-black text-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
            商务数据分析教学
          </Link>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-full md:w-96">
              <SearchBar />
            </div>
            <Link
              to="/"
              className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
            >
              ← 返回首页
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block text-4xl mb-4">📖</div>
            <h1 className="text-4xl font-bold mb-4">商务数据分析 · 术语速查手册</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              汇总 {glossary.length} 个核心分析指标与概念，按分类浏览或关键词搜索，随时查询含义、公式与实例。
            </p>

            {/* 自己的搜索框 */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="输入关键词搜索术语、指标、公式…"
                  className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900 dark:text-white"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 分类筛选 */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['全部', ...GLOSSARY_CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              当前显示 {filtered.length} / {glossary.length} 个术语
            </div>
          </div>
        </div>
      </section>

      {/* 术语内容 */}
      <main className="container mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">😕</div>
            <p>没有找到匹配的术语，换个关键词试试？</p>
          </div>
        ) : (
          <div className="space-y-8 max-w-5xl mx-auto">
            {Object.entries(grouped).map(([category, terms]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 pb-2 border-b-2 border-gray-200 dark:border-gray-800">
                  <span className="text-gray-400">#</span>
                  {category}
                  <span className="text-sm font-normal text-gray-500">({terms.length})</span>
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {terms.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {t.term}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                        {t.definition}
                      </p>
                      {t.formula && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 mb-3 font-mono text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-gray-500 dark:text-gray-500 text-xs block mb-1">📐 公式</span>
                          {t.formula}
                        </div>
                      )}
                      {t.example && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 italic border-l-2 border-gray-300 dark:border-gray-700 pl-3">
                          💡 {t.example}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 dark:bg-gray-900 border-t border-gray-800 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>商务数据分析教学内容 © 2026 · 持续补充中</p>
        </div>
      </footer>
    </div>
  );
};

export default GlossaryPage;
