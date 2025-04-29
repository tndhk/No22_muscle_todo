// import Image from "next/image"; // 不要なので削除
import { WorkoutList } from "@/components/features/workout/WorkoutList"; // WorkoutList をインポート
import { WorkoutCalendar } from "@/components/features/workout/WorkoutCalendar"; // WorkoutCalendar をインポート
import { ResetDataButton } from "@/components/features/settings/ResetDataButton"; // ResetDataButton をインポート

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">筋トレチェック</h1>
      </header>

      <main className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">今日のメニュー</h2>
          {/* WorkoutList コンポーネントを配置 */}
          <WorkoutList />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">達成カレンダー</h2>
          {/* WorkoutCalendar コンポーネントを配置 */}
          <WorkoutCalendar />
        </section>

        <section>
           <h2 className="text-xl font-semibold mb-4">設定</h2>
           {/* ResetDataButton コンポーネントを配置 */}
           <ResetDataButton />
        </section>
      </main>

      {/* フッターは必要であれば追加 */}
      {/* <footer className="mt-12 text-center text-muted-foreground">
        <p>&copy; 2024 筋トレチェック</p>
      </footer> */}
    </div>
  );
}
