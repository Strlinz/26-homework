// ---------- 类型定义 ----------
export type BadgeId =
  | 'first-answer'
  | 'first-project'
  | 'three-projects'
  | 'five-projects'
  | 'ten-projects'
  | 'points-100'
  | 'points-300'
  | 'points-500'
  | 'challenge-visitor'
  | 'challenge-master';

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  rarity: '普通' | '稀有' | '史诗' | '传说';
  /** 解锁条件的可读描述 */
  condition: string;
}

// ---------- 徽章库 ----------
export const BADGES: Badge[] = [
  {
    id: 'first-answer',
    name: '初露锋芒',
    description: '答对第一道题，迈出学习第一步',
    icon: '🎯',
    rarity: '普通',
    condition: '答对任意一道选择题',
  },
  {
    id: 'first-project',
    name: '学徒初成',
    description: '完成第一个项目学习',
    icon: '📘',
    rarity: '普通',
    condition: '标记任意 1 个项目为完成',
  },
  {
    id: 'three-projects',
    name: '渐入佳境',
    description: '已完成 3 个项目，熟悉常用分析思路',
    icon: '🚀',
    rarity: '稀有',
    condition: '累计完成 3 个项目',
  },
  {
    id: 'five-projects',
    name: '数据分析手',
    description: '已完成 5 个项目，掌握多种核心方法',
    icon: '📊',
    rarity: '稀有',
    condition: '累计完成 5 个项目',
  },
  {
    id: 'ten-projects',
    name: '商务分析专家',
    description: '完成全部项目学习',
    icon: '🏆',
    rarity: '传说',
    condition: '完成全部 10 个项目',
  },
  {
    id: 'points-100',
    name: '百分达人',
    description: '累计积分达到 100',
    icon: '💯',
    rarity: '普通',
    condition: '积分 ≥ 100',
  },
  {
    id: 'points-300',
    name: '积分勇士',
    description: '累计积分达到 300',
    icon: '⚡',
    rarity: '稀有',
    condition: '积分 ≥ 300',
  },
  {
    id: 'points-500',
    name: '积分大师',
    description: '累计积分达到 500，完成本站主线目标',
    icon: '👑',
    rarity: '史诗',
    condition: '积分 ≥ 500',
  },
  {
    id: 'challenge-visitor',
    name: '挑战者',
    description: '进入过最终挑战页面',
    icon: '⚔️',
    rarity: '普通',
    condition: '访问 /final-challenge 页面',
  },
  {
    id: 'challenge-master',
    name: '挑战大师',
    description: '在最终挑战中正确率达到 70% 以上',
    icon: '🌟',
    rarity: '史诗',
    condition: '最终挑战答对 ≥ 7 题',
  },
];

// ---------- 本地存储 Key ----------
export const STORAGE_KEYS = {
  points: 'analytics_points',
  completedProjects: 'analytics_completed_projects',
  extraBadges: 'analytics_badges',
  challengeVisited: 'analytics_challenge_visited',
  challengeCorrect: 'analytics_challenge_correct',
  firstAnswered: 'analytics_first_answered',
  seenToastBadges: 'analytics_seen_toast_badges',
} as const;

// ---------- 徽章稀有度样式 ----------
const RARITY_STYLE: Record<
  Badge['rarity'],
  { ring: string; bg: string; text: string; label: string }
> = {
  普通: {
    ring: 'ring-gray-300 dark:ring-gray-600',
    bg: 'bg-gray-50 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-300',
    label: 'text-gray-500 dark:text-gray-400',
  },
  稀有: {
    ring: 'ring-blue-300 dark:ring-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-700 dark:text-blue-200',
    label: 'text-blue-600 dark:text-blue-300',
  },
  史诗: {
    ring: 'ring-purple-400 dark:ring-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950',
    text: 'text-purple-700 dark:text-purple-200',
    label: 'text-purple-600 dark:text-purple-300',
  },
  传说: {
    ring: 'ring-yellow-400 dark:ring-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900',
    text: 'text-yellow-700 dark:text-yellow-200',
    label: 'text-yellow-600 dark:text-yellow-300',
  },
};

export function getRarityStyle(rarity: Badge['rarity']) {
  return RARITY_STYLE[rarity] ?? RARITY_STYLE['普通'];
}

// ---------- localStorage 辅助工具 ----------
export function readStorageNumber(key: string, fallback = 0): number {
  try {
    const v = localStorage.getItem(key);
    return v ? parseInt(v, 10) || fallback : fallback;
  } catch {
    return fallback;
  }
}

export function readStorageStringArray(key: string): string[] {
  try {
    const v = localStorage.getItem(key);
    if (!v) return [];
    const arr = JSON.parse(v);
    return Array.isArray(arr) ? arr.filter((x: unknown) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}
