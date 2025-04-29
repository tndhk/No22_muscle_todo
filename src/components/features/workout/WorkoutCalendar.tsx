"use client";

import { Calendar } from "@/components/ui/calendar";
import { useWorkoutLog } from "@/hooks/useWorkoutLog";
import { WORKOUT_MENUS } from "@/lib/constants/workoutMenus";
import { useState, useMemo } from 'react';

export function WorkoutCalendar() {
  const { log, isLoading } = useWorkoutLog();
  const [month, setMonth] = useState<Date>(new Date()); // 表示月を管理

  const completedDays = useMemo(() => {
    if (isLoading) return [];

    const dates = Object.keys(log)
      .filter(dateStr => {
        // その日のログが全メニューを含んでいるかチェック
        const dailyLog = log[dateStr] || [];
        return WORKOUT_MENUS.every(menu => dailyLog.includes(menu));
      })
      .map(dateStr => new Date(dateStr)); // Dateオブジェクトに変換

    return dates;
  }, [log, isLoading]);

  // カスタム修飾子を定義
  const modifiers = {
    completed: completedDays,
  };

  // classNames でカスタム修飾子のスタイルを指定 (一旦コメントアウト)
  // const classNames: import('react-day-picker').ClassNames = {
  //   ????_completed: "bg-green-500 text-primary-foreground rounded-full", // 正しいキー名が不明
  // };

  if (isLoading) {
    // ローディング中はカレンダーのスケルトン表示
    return (
      <div className="p-4 border rounded-md animate-pulse">
        <div className="flex justify-between mb-4">
          <div className="h-6 w-20 rounded bg-muted"></div>
          <div className="h-6 w-20 rounded bg-muted"></div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(35)].map((_, i) => (
            <div key={i} className="h-8 w-8 rounded-full bg-muted"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Calendar
      mode="multiple"
      selected={completedDays}
      month={month}
      onMonthChange={setMonth}
      modifiers={modifiers}
      // classNames={classNames} // 一旦コメントアウト
      showOutsideDays
      className="rounded-md border"
    />
  );
} 