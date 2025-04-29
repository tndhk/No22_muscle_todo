"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { enUS } from "date-fns/locale"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={enUS}
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown"
      formatters={{
        formatWeekdayName: (date) =>
          format(date, "EE", { locale: enUS }), // "Su","Mo",...
      }}
      className={cn("p-3", className)}
      classNames={{
        // 全体テーブルを固定レイアウトにして均等幅
        table: "w-full table-fixed border-collapse",
        // 複数月表示用のコンテナ
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",

        // 月年ドロップダウン＋ナビを横並び
        caption: "flex justify-between items-center px-2",
        caption_label: "hidden", // デフォルトラベルを隠す
        nav: "flex items-center space-x-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        // 曜日ヘッダー
        head_row: "", // デフォルトの <tr> レイアウトに戻す
        head_cell: "text-center text-muted-foreground font-normal text-[0.8rem]",

        // 各週の行もデフォルトの <tr>
        row: "",

        // 日付セル
        cell:
          "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),

        // その他の状態クラス
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        // ドロップダウン部分（月＋年）を一行にまとめる
        DropdownNav: ({ className, ...rest }) => (
          <div className={cn("flex items-center space-x-2 px-2", className)} {...rest} />
        ),

        // ナビゲーション矢印アイコン
        Chevron: ({ orientation, ...rest }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="h-4 w-4" {...rest} />
        },
        
        // 曜日ヘッダーを完全カスタマイズ
        Weekdays: () => {
          const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
          return (
            <thead>
              <tr className="grid grid-cols-7 gap-0">
                {weekdays.map((day) => (
                  <th key={day} className="text-center text-muted-foreground text-[0.8rem] p-1 font-normal">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
          );
        }
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"
export { Calendar }
