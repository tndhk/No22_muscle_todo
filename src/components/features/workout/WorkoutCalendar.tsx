"use client";

import { Calendar } from "@/components/ui/calendar";
import { useWorkoutLog } from "@/hooks/useWorkoutLog";
import { WORKOUT_MENUS } from "@/lib/constants/workoutMenus";
import { useState, useMemo } from 'react';

export function WorkoutCalendar() {
  const { log, isLoading } = useWorkoutLog();
  const [month, setMonth] = useState<Date>(new Date());

  const completedDays = useMemo(() => {
    if (isLoading) return [];

    const dates = Object.keys(log)
      .filter(dateStr => {
        const dailyLog = log[dateStr] || [];
        return WORKOUT_MENUS.every(menu => dailyLog.includes(menu));
      })
      .map(dateStr => new Date(dateStr));

    return dates;
  }, [log, isLoading]);

  const modifiers: Record<string, Date[]> = {
    completed: completedDays,
  };

  if (isLoading) {
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
      showOutsideDays
      className="rounded-md border"
    />
  );
} 