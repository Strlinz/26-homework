import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import { usePoints } from '../context/PointsContext';
import { getRarityStyle } from '../context/points';
import { useTheme } from '../hooks/useTheme';

const HomePage: React.FC = () => {
  const {
    points,
    completedProjects,
    earnedBadges,
    allBadges,
    resetPoints,
  } = usePoints();
  const { toggleTheme, isDark } = useTheme();

  const totalProjects = projects.length;
  const completedCount = completedProjects.length;
  const progressPercent = Math.round((completedCount / totalProjects) * 100);

  // 找到下一个未完成的项目（按列表顺序）
  const nextProject = projects.find((p) => !completedProjects.includes(p.id));

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="bg-black text-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
            商务数据分析教学
          </Link>
          <nav className="flex items-center gap-4 w-full md:w-auto flex-wrap justify-center">
            <div className="w-full md:w-80">
              <SearchBar />
            </div>
            <Link
              to="/glossary"
              className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
            >
              📖 术语表
            </Link>
            <Link
              to="/badges"
              className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
            >
              🏅 徽章
            </Link>
            <Link
              to="/python"
              className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
            >
              🐍 Python
            </Link>
            <Link
              to="/final-challenge"
              className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
            >
              ⚔️ 挑战
            </Link>
            <button
              onClick={toggleTheme}
              aria-label="切换主题"
              className="text-sm px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              {isDark ? '☀️ 亮色' : '🌙 暗色'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero: 积分 + 学习进度 + 徽章 */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* 积分卡 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">我的积分</span>
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="text-4xl font-bold">{points}</div>
                <div className="text-xs text-gray-500 mt-1">完成练习获得更多积分</div>
              </div>

              {/* 进度卡 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">项目进度</span>
                  <span className="text-2xl">📊</span>
                </div>
                <div className="text-4xl font-bold">
                  {completedCount}
                  <span className="text-lg text-gray-400"> / {totalProjects}</span>
                </div>
                <div className="mt-3 bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-black dark:bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-2">完成度 {progressPercent}%</div>
              </div>

              {/* 徽章卡（可点击） */}
              <Link
                to="/badges"
                className="block bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">徽章收藏</span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">🏅</span>
                </div>
                <div className="text-4xl font-bold">
                  {earnedBadges.length}
                  <span className="text-lg text-gray-400"> / {allBadges.length}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {allBadges.slice(0, 6).map((b) => {
                    const earned = earnedBadges.includes(b.id);
                    const s = getRarityStyle(b.rarity);
                    return (
                      <span
                        key={b.id}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-base ${
                          earned
                            ? `${s.bg} ring-2 ${s.ring}`
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 opacity-50 grayscale'
                        }`}
                        title={b.name}
                      >
                        {b.icon}
                      </span>
                    );
                  })}
                  {allBadges.length > 6 && (
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs text-gray-500">
                      +{allBadges.length - 6}
                    </span>
                  )}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-2 group-hover:underline">
                  → 查看全部徽章
                </div>
              </Link>
            </div>

            {/* 我的荣誉（已获得徽章） */}
            {earnedBadges.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-gray-800 mb-8">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                  <span>✨</span>最近获得的荣誉
                </div>
                <div className="flex flex-wrap gap-3">
                  {allBadges
                    .filter((b) => earnedBadges.includes(b.id))
                    .slice(-6)
                    .reverse()
                    .map((b) => {
                      const s = getRarityStyle(b.rarity);
                      return (
                        <div
                          key={b.id}
                          className={`flex items-center gap-2 ${s.bg} border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg text-sm`}
                        >
                          <span className="text-lg">{b.icon}</span>
                          <div>
                            <div className={`font-medium ${s.text}`}>{b.name}</div>
                            <div className="text-xs text-gray-500">{b.rarity}</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* 继续学习推荐卡 */}
            {nextProject && (
              <Link
                to={`/project/${nextProject.id}`}
                className="block rounded-xl p-5 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">📚</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-blue-600 dark:text-blue-300 font-medium mb-1">
                      👉 继续学习
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {nextProject.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {nextProject.description}
                    </div>
                  </div>
                  <div className="hidden md:block text-blue-600 dark:text-blue-300 font-semibold">
                    继续 →
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* 推荐学习路径 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-3">🧭</span>
            推荐学习路径
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm">
              {[
                { name: '基础思维', icon: '💡', desc: '首页内容' },
                { name: '数据清洗', icon: '🧹', desc: '项目1-2' },
                { name: '转化分析', icon: '🔻', desc: '项目3-4' },
                { name: '用户分层', icon: '👥', desc: '项目5-7' },
                { name: '关联挖掘', icon: '🔗', desc: '项目8-9' },
                { name: '实战挑战', icon: '⚔️', desc: '最终挑战' },
              ].map((step, idx, arr) => (
                <React.Fragment key={step.name}>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                    <span>{step.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{step.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</div>
                    </div>
                  </div>
                  {idx < arr.length - 1 && (
                    <span className="text-gray-400 text-xl hidden md:inline">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 核心思维模式 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-3">💡</span>
            商务数据分析的五大核心思维
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: 1, name: '数据驱动决策', desc: '基于数据事实而非直觉做出业务决策，用数据验证假设，持续优化策略。' },
              { n: 2, name: '分层分类思维', desc: '将用户、商品、订单等按关键维度分层，识别不同群体的特征和需求。' },
              { n: 3, name: '漏斗转化思维', desc: '将业务过程拆解为转化漏斗，识别流失环节，优化关键节点。' },
              { n: 4, name: '对比分析思维', desc: '通过时间对比、群体对比、AB 测试等方式发现规律，验证效果。' },
              { n: 5, name: '业务场景思维', desc: '数据分析必须紧密联系业务场景，理解数据背后的业务逻辑和因果关系。' },
            ].map((t) => (
              <div
                key={t.n}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <span className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold mr-3">
                    {t.n}
                  </span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t.name}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 专家争论焦点 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-3">💬</span>
            领域专家争论的焦点
          </h2>
          <div className="space-y-4">
            {[
              {
                q: '数据量重要还是数据质量重要？',
                a: ['大数据时代数据量可以弥补质量问题，统计规律自然显现', '错误数据导致错误结论，宁可少用数据也要保证准确可靠'],
              },
              {
                q: '自动化分析能否替代业务理解？',
                a: ['机器学习能发现人工难以察觉的模式，自动化工具提效明显', '算法需要业务知识指导，否则会挖掘出虚假关联甚至有害模式'],
              },
              {
                q: '精细化运营 VS 简单粗暴策略？',
                a: ['每个用户都值得个性化对待，长期 ROI 更高，用户体验更好', '过度精细化增加复杂度，效果提升有限，简单策略执行成本低'],
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  争论 {idx + 1}：{item.q}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">📘 观点 A</p>
                    <p className="text-sm text-blue-800 dark:text-blue-300">{item.a[0]}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-900 dark:text-green-200 mb-1">📗 观点 B</p>
                    <p className="text-sm text-green-800 dark:text-green-300">{item.a[1]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 术语表快捷入口 */}
        <div className="mb-10">
          <Link
            to="/glossary"
            className="block bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📖</div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    数据分析术语速查手册
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    汇总 GMV、ARPU、RFM、LTV 等核心指标与概念，含公式与实战案例
                  </p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </Link>
        </div>

        {/* Python Interpreter 快捷入口 */}
        <div className="mb-10">
          <Link
            to="/python"
            className="block bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🐍</div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Python 解释器</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    在浏览器中直接运行 Python 代码，练习数据分析技巧
                  </p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </Link>
        </div>

        {/* Project List Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📚 项目列表</h2>
            {completedCount > 0 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                已完成 {completedCount} / {totalProjects}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* 最终挑战入口 */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-black to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white rounded-xl p-8 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">完成学习？挑战最终测试！</h2>
            <p className="text-gray-300 mb-6">
              10 道综合题，测试你对商务数据分析的理解程度
              <br />
              每答对一题获得 <span className="font-bold text-yellow-300">50 积分</span>！
            </p>
            <Link
              to="/final-challenge"
              className="inline-block px-8 py-4 bg-white text-black dark:bg-yellow-400 dark:text-black rounded-lg hover:bg-gray-100 dark:hover:bg-yellow-300 transition-colors font-semibold"
            >
              ⚔️ 开始挑战
            </Link>
          </div>
        </div>

        {/* 重置数据 */}
        {points > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (confirm('确定要清空所有积分和进度吗？此操作不可撤销。')) {
                  resetPoints();
                }
              }}
              className="text-xs text-gray-400 hover:text-red-500 underline"
            >
              重置我的学习数据
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 dark:bg-gray-900 border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p className="mb-2">商务数据分析教学内容 © 2026 · 持续补充中</p>
          <p className="text-xs text-gray-500">
            当前主题：{isDark ? '🌙 暗色模式' : '☀️ 亮色模式'} · 积分：{points} · 完成：
            {completedCount}/{totalProjects} 项目 · 徽章：{earnedBadges.length}/{allBadges.length}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
