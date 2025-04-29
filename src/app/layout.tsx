import type { Metadata } from "next";
// Geist フォントのインポートを削除
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // Shadcn/ui のユーティリティをインポート

// Geist フォントの設定を削除
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  // アプリのタイトルと説明に更新
  title: "筋トレチェック",
  description: "日々の筋トレ実施状況を記録・可視化するWebアプリ",
  manifest: "/manifest.json", // manifest.json へのパスを追加
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
