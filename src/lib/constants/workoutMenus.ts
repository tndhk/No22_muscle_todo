export const WORKOUT_MENUS = [
  "サイドプランク",
  "スクワット",
  "デッドバグ",
  // 必要に応じて他の固定メニューを追加
] as const;

export type WorkoutMenu = (typeof WORKOUT_MENUS)[number]; 