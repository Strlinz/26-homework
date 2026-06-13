import React from 'react';
import { Link } from 'react-router-dom';
import { usePoints } from '../context/PointsContext';
import { getRarityStyle } from '../context/points';
import { projects } from '../data/projects';

const totalProjects = projects.length;

/** 为每个徽章计算完成进度（0~1） */
function computeProgress(badgeId: string, data: {
  points: number;
  completedCount: number;
  firstAnswered: boolean;
  challengeVisited: boolean;
  challengeBestCorrect: number;
}): { current: number; target: number } {
  switch (badgeId) {
    case 'first-answer':
      return { current: data.firstAnswered ? 1 : 0, target: 1 };
    case 'first-project':
      return { current: Math.min(data.completedCount, 1), target: 1 };
    case 'three-projects':
      return { current: Math.min(data.completedCount, 3), target: 3 };
    case 'five-projects':
      return { current: Math.min(data.completedCount, 5), target: 5 };
    case 'ten-projects':
      return { current: Math.min(data.completedCount, totalProjects), target: totalProjects };
    case 'points-100':
      return { current: Math.min(data.points, 100), target: 100 };
    case 'points-300':
      return { current: Math.min(data.points, 300), target: 300 };
    case 'points-500':
      return { current: Math.min(data.points, 500), target: 500 };
    case 'challenge-visitor':
      return { current: data.challengeVisited ? 1 : 0, target: 1 };
    case 'challenge-master':
      return { current: Math.min(data.challengeBestCorrect, 7), target: 7 };
    default:
      return { current: 0, target: 1 };
  }
}

const BadgesPage: React.FC = () => {
  const { allBadges, earnedBadges, points, completedProjects, challengeBestCorrect, isBadgeEarned } =
    usePoints();

  const firstAnswered = isBadgeEarned('first-answer');
  const challengeVisited = isBadgeEarned('challenge-visitor');
  const completedCount = completedProjects.length;

  const earnedCount = earnedBadges.length;
  const totalCount = allBadges.length;
  const percent = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="bg-black text-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3 flex-wrap">
          <Link to="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
            🏅 徽章收藏 · 返回首页
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/glossary" className="text-gray-300 hover:text-white transition-colors">
              📖 术语表
            </Link>
            <Link to="/python" className="text-gray-300 hover:text-white transition-colors">
              🐍 Python
            </Link>
            <Link to="/final-challenge" className="text-gray-300 hover:text-white transition-colors">
              ⚔️ 挑战
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* 顶部汇总卡 */}
        <section className="mb-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="text-6xl">🏅</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">我的徽章收藏</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                通过答题、完成项目、挑战最终测试来收集徽章。当前进度：
                <span className="font-semibold text-gray-900 dark:text-white">
                  {' '}
                  {earnedCount} / {totalCount}
                </span>{' '}
                枚
              </p>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden max-w-md">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-2">{percent}% 完成</div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">{points}</div>
                <div className="text-xs text-gray-500">总积分</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{completedCount}</div>
                <div className="text-xs text-gray-500">完成项目</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{challengeBestCorrect}</div>
                <div className="text-xs text-gray-500">挑战最佳</div>
              </div>
            </div>
          </div>
        </section>

        {/* 徽章网格 */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allBadges.map((badge) => {
            const earned = isBadgeEarned(badge.id);
            const s = getRarityStyle(badge.rarity);
            const { current, target } = computeProgress(badge.id, {
              points,
              completedCount,
              firstAnswered,
              challengeVisited,
              challengeBestCorrect,
            });
            const progress = target === 0 ? 100 : Math.round((current / target) * 100);

            return (
              <div
                key={badge.id}
                className={`relative rounded-xl p-5 border transition-all duration-300 ${
                  earned
                    ? `${s.bg} border-gray-200 dark:border-gray-700 shadow-md hover:-translate-y-1 hover:shadow-lg`
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center text-3xl shrink-0 ${
                      earned
                        ? `${s.bg} ring-2 ${s.ring} bg-white dark:bg-gray-900`
                        : 'bg-gray-100 dark:bg-gray-800 ring-2 ring-gray-200 dark:ring-gray-700'
                    } ${!earned ? 'grayscale' : ''}`}
                  >
                    {earned ? badge.icon : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-semibold truncate ${
                          earned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {badge.name}
                      </h3>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border border-current shrink-0 ${s.label}`}
                      >
                        {badge.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      {badge.description}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                      📌 条件：{badge.condition}
                    </div>
                    {!earned && (
                      <div className="mt-2">
                        <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                          <span>
                            进度 {current}/{target}
                          </span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-400 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {earned && (
                      <div className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">
                        ✓ 已获得
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* 下一步建议 */}
        <section className="mt-12 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>💡</span>下一步可以怎么解锁更多徽章？
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
            {!isBadgeEarned('first-answer') && (
              <li>在任意项目的练习题中答对一道题，即可解锁「初露锋芒」。</li>
            )}
            {!isBadgeEarned('first-project') && (
              <li>
                在项目详情页点击「标记完成」，完成第一个项目即可获得「学徒初成」 + 20 积分。
              </li>
            )}
            {!isBadgeEarned('points-100') && (
              <li>
                继续在项目中做题（每题 +10 积分）或完成项目（每个 +20 积分），攒到 100 分获得「百分达人」。
              </li>
            )}
            {!isBadgeEarned('challenge-visitor') && (
              <li>
                <Link
                  to="/final-challenge"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  进入最终挑战
                </Link>
                ，至少答对 7 题可获得史诗徽章「挑战大师」。
              </li>
            )}
            {isBadgeEarned('ten-projects') && isBadgeEarned('points-500') && (
              <li>🎉 恭喜！你已集齐所有主线徽章，你是真正的商务数据分析专家。</li>
            )}
          </ul>
        </section>
      </main>

      <footer className="bg-black text-gray-400 dark:bg-gray-900 border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          商务数据分析教学内容 © 2026 · 持续补充中
        </div>
      </footer>
    </div>
  );
};

export default BadgesPage;
