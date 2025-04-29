"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useWorkoutLog } from "@/hooks/useWorkoutLog";

export function ResetDataButton() {
  const { resetLog } = useWorkoutLog();

  const handleReset = () => {
    // 確認ダイアログでOKが押されたらリセットを実行
    resetLog();
    // 必要であればリセット完了の通知などを追加 (例: react-hot-toast)
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">記録をリセット</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当にリセットしますか？</AlertDialogTitle>
          <AlertDialogDescription>
            すべての筋トレ記録が削除されます。この操作は元に戻せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>リセットする</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 