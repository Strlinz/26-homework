import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import {
  BADGES,
  STORAGE_KEYS,
  readStorageNumber,
  readStorageStringArray,
} from './points';
import type { Badge, BadgeId } from './points';

interface PointsContextType {
  points: number;
  completedProjects: string[];
  allBadges: Badge[];
  earnedBadges: BadgeId[];
  pendingToastBadges: Badge[];
  dismissToastBadge: (badgeId: BadgeId) => void;
  isBadgeEarned: (id: BadgeId) => boolean;
  addPoints: (amount: number) => void;
  resetPoints: () => void;
  markProjectCompleted: (projectId: string) => boolean;
  unmarkProjectCompleted: (projectId: string) => void;
  isProjectCompleted: (projectId: string) => boolean;
  recordCorrectAnswer: () => void;
  markChallengeVisited: () => void;
  recordChallengeResult: (correctCount: number) => void;
  challengeBestCorrect: number;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(() => readStorageNumber(STORAGE_KEYS.points, 0));
  const [completedProjects, setCompletedProjects] = useState<string[]>(() =>
    readStorageStringArray(STORAGE_KEYS.completedProjects),
  );
  const [extraBadges, setExtraBadges] = useState<string[]>(() =>
    readStorageStringArray(STORAGE_KEYS.extraBadges),
  );
  const [firstAnswered, setFirstAnswered] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEYS.firstAnswered) === '1',
  );
  const [challengeVisited, setChallengeVisited] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEYS.challengeVisited) === '1',
  );
  const [challengeBestCorrect, setChallengeBestCorrect] = useState<number>(() =>
    readStorageNumber(STORAGE_KEYS.challengeCorrect, 0),
  );
  const [seenToastBadges, setSeenToastBadges] = useState<string[]>(() =>
    readStorageStringArray(STORAGE_KEYS.seenToastBadges),
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.points, String(points));
  }, [points]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.completedProjects, JSON.stringify(completedProjects));
  }, [completedProjects]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.extraBadges, JSON.stringify(extraBadges));
  }, [extraBadges]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.challengeCorrect, String(challengeBestCorrect));
  }, [challengeBestCorrect]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.seenToastBadges, JSON.stringify(seenToastBadges));
  }, [seenToastBadges]);

  const autoBadges = useMemo<Set<BadgeId>>(() => {
    const set = new Set<BadgeId>();
    if (firstAnswered) set.add('first-answer');
    if (completedProjects.length >= 1) set.add('first-project');
    if (completedProjects.length >= 3) set.add('three-projects');
    if (completedProjects.length >= 5) set.add('five-projects');
    if (completedProjects.length >= 10) set.add('ten-projects');
    if (points >= 100) set.add('points-100');
    if (points >= 300) set.add('points-300');
    if (points >= 500) set.add('points-500');
    if (challengeVisited) set.add('challenge-visitor');
    if (challengeBestCorrect >= 7) set.add('challenge-master');
    return set;
  }, [points, completedProjects.length, firstAnswered, challengeVisited, challengeBestCorrect]);

  const earnedBadges = useMemo<BadgeId[]>(() => {
    const merged = new Set<string>([...Array.from(autoBadges), ...extraBadges]);
    return BADGES.filter((b) => merged.has(b.id)).map((b) => b.id);
  }, [autoBadges, extraBadges]);

  const pendingToastBadges = useMemo<Badge[]>(() => {
    const seen = new Set(seenToastBadges);
    return BADGES.filter((b) => autoBadges.has(b.id) || extraBadges.includes(b.id)).filter(
      (b) => !seen.has(b.id),
    );
  }, [autoBadges, extraBadges, seenToastBadges]);

  const dismissToastBadge = useCallback((badgeId: BadgeId) => {
    setSeenToastBadges((prev) => (prev.includes(badgeId) ? prev : [...prev, badgeId]));
  }, []);

  const addPoints = useCallback((amount: number) => {
    if (!amount) return;
    setPoints((prev) => Math.max(0, prev + amount));
  }, []);

  const resetPoints = useCallback(() => {
    setPoints(0);
    setCompletedProjects([]);
    setExtraBadges([]);
    setFirstAnswered(false);
    setChallengeVisited(false);
    setChallengeBestCorrect(0);
    setSeenToastBadges([]);
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  }, []);

  const markProjectCompleted = useCallback(
    (projectId: string) => {
      let newly = false;
      setCompletedProjects((prev) => {
        if (prev.includes(projectId)) return prev;
        newly = true;
        return [...prev, projectId];
      });
      return newly;
    },
    [],
  );

  const unmarkProjectCompleted = useCallback((projectId: string) => {
    setCompletedProjects((prev) => prev.filter((id) => id !== projectId));
  }, []);

  const isProjectCompleted = useCallback(
    (projectId: string) => completedProjects.includes(projectId),
    [completedProjects],
  );

  const recordCorrectAnswer = useCallback(() => {
    if (!firstAnswered) {
      setFirstAnswered(true);
      localStorage.setItem(STORAGE_KEYS.firstAnswered, '1');
    }
  }, [firstAnswered]);

  const markChallengeVisited = useCallback(() => {
    if (!challengeVisited) {
      setChallengeVisited(true);
      localStorage.setItem(STORAGE_KEYS.challengeVisited, '1');
    }
  }, [challengeVisited]);

  const recordChallengeResult = useCallback((correctCount: number) => {
    setChallengeBestCorrect((prev) => (correctCount > prev ? correctCount : prev));
  }, []);

  const isBadgeEarned = useCallback(
    (id: BadgeId) => earnedBadges.includes(id),
    [earnedBadges],
  );

  const value: PointsContextType = {
    points,
    completedProjects,
    allBadges: BADGES,
    earnedBadges,
    pendingToastBadges,
    dismissToastBadge,
    isBadgeEarned,
    addPoints,
    resetPoints,
    markProjectCompleted,
    unmarkProjectCompleted,
    isProjectCompleted,
    recordCorrectAnswer,
    markChallengeVisited,
    recordChallengeResult,
    challengeBestCorrect,
  };

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
};

export const usePoints = () => {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error('usePoints must be used within a PointsProvider');
  return ctx;
};
