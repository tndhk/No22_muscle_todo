import { WorkoutMenu } from "@/lib/constants/workoutMenus";

/**
 * ローカルストレージに保存されるチェック状態のデータ構造
 * キー: 日付 (YYYY-MM-DD)
 * 値: その日にチェック済みのメニュー名リスト
 */
export type CheckedState = {
  [date: string]: WorkoutMenu[];
}; 