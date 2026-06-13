import React, { useEffect, useState } from 'react';
import { usePoints } from '../context/PointsContext';
import type { Badge } from '../context/points';
import { getRarityStyle } from '../context/points';

/** 单个徽章 Toast（从右下角滑入） */
const BadgeToastItem: React.FC<{ badge: Badge; onDone: () => void }> = ({ badge, onDone }) => {
  const [visible, setVisible] = useState(false);

  // 入场
  useEffect(() => {
    const t1 = window.setTimeout(() => setVisible(true), 30);
    // 展示 4 秒后淡出，再卸载
    const t2 = window.setTimeout(() => setVisible(false), 4000);
    const t3 = window.setTimeout(() => onDone(), 4600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onDone]);

  const s = getRarityStyle(badge.rarity);

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 min-w-[280px] max-w-sm ${s.bg} border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl px-4 py-3 transition-all duration-500 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ring-2 ${s.ring} bg-white dark:bg-gray-900 shrink-0`}
      >
        {badge.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-0.5">
          🎉 获得新徽章
        </div>
        <div className="font-semibold text-gray-900 dark:text-white truncate">{badge.name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {badge.description}
        </div>
      </div>
      <span
        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border border-current shrink-0 ${s.label}`}
      >
        {badge.rarity}
      </span>
    </div>
  );
};

/** 全局徽章 Toast 容器（放在页面右下角） */
const BadgeToast: React.FC = () => {
  const { pendingToastBadges, dismissToastBadge } = usePoints();

  // 一次只展示一个（第一个），等它消失再展示下一个
  const current = pendingToastBadges[0];

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"
    >
      {current && (
        <BadgeToastItem
          key={current.id}
          badge={current}
          onDone={() => dismissToastBadge(current.id)}
        />
      )}
    </div>
  );
};

export default BadgeToast;
