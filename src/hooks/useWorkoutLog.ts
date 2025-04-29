"use client";

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { CheckedState } from '@/lib/types';
import { WorkoutMenu } from '@/lib/constants/workoutMenus';

const LOCAL_STORAGE_KEY = 'workoutLog';

// ISO 8601 形式の日付文字列 (YYYY-MM-DD)
const getFormattedDate = (date: Date): string => format(date, 'yyyy-MM-dd');

export function useWorkoutLog() {
  const [log, setLog] = useState<CheckedState>({});
  const [isLoading, setIsLoading] = useState(true);

  // 初期読み込み
  useEffect(() => {
    try {
      const savedLog = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedLog) {
        setLog(JSON.parse(savedLog));
      } else {
        setLog({}); // データがない場合は空のオブジェクト
      }
    } catch (error) {
      console.error('Failed to load workout log from localStorage:', error);
      setLog({}); // エラー時も空のオブジェクト
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ログの保存 (log ステートが変更されるたびに実行)
  useEffect(() => {
    // 初期読み込み中は保存しない
    if (isLoading) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(log));
    } catch (error) {
      console.error('Failed to save workout log to localStorage:', error);
      // ここでユーザーに通知するなどの処理を追加することも検討
    }
  }, [log, isLoading]);

  // 特定の日のログを取得
  const getLogForDate = useCallback((date: Date): WorkoutMenu[] => {
    const formattedDate = getFormattedDate(date);
    return log[formattedDate] || [];
  }, [log]);

  // 特定の日にメニューを追加/削除 (トグル)
  const toggleWorkout = useCallback((date: Date, menu: WorkoutMenu) => {
    const formattedDate = getFormattedDate(date);
    setLog(prevLog => {
      const currentLogForDate = prevLog[formattedDate] || [];
      let newLogForDate;

      if (currentLogForDate.includes(menu)) {
        // 含まれていれば削除
        newLogForDate = currentLogForDate.filter(m => m !== menu);
      } else {
        // 含まれていなければ追加
        newLogForDate = [...currentLogForDate, menu];
      }

      // 新しい日付のログが空になった場合は、その日付のエントリ自体を削除する
      const newLog = { ...prevLog };
      if (newLogForDate.length === 0) {
        delete newLog[formattedDate];
      } else {
        newLog[formattedDate] = newLogForDate;
      }
      return newLog;
    });
  }, []);

  // 全ログをリセット
  const resetLog = useCallback(() => {
    setIsLoading(true); // 保存処理を一時停止
    setLog({});
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove workout log from localStorage:', error);
    } finally {
       // 少し遅延させてから Loading を false に戻すことで、空のログが保存されるようにする
       setTimeout(() => setIsLoading(false), 100);
    }
  }, []);

  return {
    log,
    isLoading,
    getLogForDate,
    toggleWorkout,
    resetLog,
  };
} 