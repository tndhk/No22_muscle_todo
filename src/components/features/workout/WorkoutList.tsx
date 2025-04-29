"use client";

import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { WORKOUT_MENUS } from "@/lib/constants/workoutMenus";
import { useWorkoutLog } from "@/hooks/useWorkoutLog";

export function WorkoutList() {
  const { getLogForDate, toggleWorkout, isLoading } = useWorkoutLog();
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    setToday(new Date());
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {WORKOUT_MENUS.map((menu) => (
          <div key={menu} className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded bg-muted"></div>
            <div className="h-4 w-24 rounded bg-muted"></div>
          </div>
        ))}
      </div>
    );
  }

  const todaysLog = getLogForDate(today);

  return (
    <div className="space-y-4">
      {WORKOUT_MENUS.map((menu) => {
        const isChecked = todaysLog.includes(menu);
        const checkboxId = `checkbox-${menu}`;
        return (
          <div key={menu} className="flex items-center space-x-2">
            <Checkbox
              id={checkboxId}
              checked={isChecked}
              onCheckedChange={() => toggleWorkout(today, menu)}
              aria-labelledby={`label-${menu}`}
            />
            <Label
              htmlFor={checkboxId}
              id={`label-${menu}`}
              className="flex-grow cursor-pointer"
            >
              {menu}
            </Label>
          </div>
        );
      })}
    </div>
  );
} 