// 'use client'

// import React from 'react'
// import type { BadgeProps, CalendarProps } from 'antd'
// import { Badge, Calendar, ConfigProvider } from 'antd'
// import type { Dayjs } from 'dayjs'

// type EventType = {
//   type: BadgeProps['status']
//   content: string
// }

// const getListData = (value: Dayjs): EventType[] => {
//   switch (value.date()) {
//     case 8:
//       return [
//         { type: 'warning', content: 'This is warning event.' },
//         { type: 'success', content: 'This is usual event.' },
//       ]
//     case 10:
//       return [
//         { type: 'warning', content: 'This is warning event.' },
//         { type: 'success', content: 'This is usual event.' },
//         { type: 'error', content: 'This is error event.' },
//       ]
//     case 15:
//       return [
//         { type: 'warning', content: 'This is warning event' },
//         { type: 'success', content: 'This is very long usual event......' },
//         { type: 'error', content: 'This is error event 1.' },
//         { type: 'error', content: 'This is error event 2.' },
//         { type: 'error', content: 'This is error event 3.' },
//         { type: 'error', content: 'This is error event 4.' },
//       ]
//     default:
//       return []
//   }
// }

// const getMonthData = (value: Dayjs) => {
//   if (value.month() === 8) {
//     return 1394
//   }
//   return null
// }

// const BigCalender: React.FC = () => {
//   const monthCellRender = (value: Dayjs) => {
//     const num = getMonthData(value)

//     return num ? (
//       <div className="flex flex-col items-center justify-center text-xs">
//         <span className="font-semibold text-primary">{num}</span>
//         <span className="text-muted-foreground">Backlog</span>
//       </div>
//     ) : null
//   }

//   const dateCellRender = (value: Dayjs) => {
//     const listData = getListData(value)

//     return (
//       <div className="space-y-1">
//         {listData.map((item) => (
//           <div
//             key={item.content}
//             className="text-[10px] truncate rounded-md px-1 py-0.5 bg-muted text-muted-foreground"
//           >
//             <Badge status={item.type} text={item.content} />
//           </div>
//         ))}
//       </div>
//     )
//   }

//   const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
//     if (info.type === 'date') {
//       return dateCellRender(current)
//     }
//     if (info.type === 'month') {
//       return monthCellRender(current)
//     }
//     return info.originNode
//   }

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: 'hsl(var(--primary))',
//           borderRadius: 12,
//           colorBgContainer: 'hsl(var(--card))',
//           colorText: 'hsl(var(--foreground))',
//           colorBorder: 'hsl(var(--border))',
//         },
//         components: {
//           Calendar: {
//             itemActiveBg: 'hsl(var(--primary) )',
//             controlItemBgActive: 'hsl(var(--primary-foreground))',
//             controlItemBgActiveHover: 'hsl(var(--primary-foreground))',

//           },
//         },
//       }}
//     >
//       <div className="rounded-2xl border bg-card p-4 shadow-sm">
//         <Calendar
//           cellRender={cellRender}
//           className=" text-foreground"
//         />
//       </div>
//     </ConfigProvider>
//   )
// }

// export default BigCalender
'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React, { useEffect, useState } from 'react'
import type { CalendarProps } from 'antd'
import { Calendar, ConfigProvider, theme } from 'antd'
import type { Dayjs } from 'dayjs'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type EventCategory = 'Maintenance' | 'Training' | 'Meeting' | 'Event' | 'Guest Service'

interface CalendarEvent {
  time: string
  title: string
  category: EventCategory
}

const categoryStyles: Record<EventCategory, string> = {
  Maintenance: "bg-violet-500/20 text-violet-600 dark:text-violet-300 border-l-4 border-violet-500",
  Training: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-l-4 border-emerald-500",
  Meeting: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-l-4 border-cyan-500",
  Event: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 border-l-4 border-yellow-500",
  "Guest Service": "bg-lime-500/20 text-lime-600 dark:text-lime-300 border-l-4 border-lime-500",
}

const getListData = (value: Dayjs): CalendarEvent[] => {
  const date = value.date()
  if (date === 1) return [{ time: '11:00 AM - 1:00 PM', title: 'Room Inspection', category: 'Maintenance' }]
  if (date === 5) return [{ time: '2:00 PM - 4:00 PM', title: 'Fire Safety Training', category: 'Training' }]
  if (date === 12) return [{ time: '9:00 AM - 1:00 PM', title: 'Inventory Check', category: 'Maintenance' }]
  return []
}

const BigCalender: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [mounted, setMounted] = useState(false)
  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date)
    setOpen(true)
  }
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <div className="flex flex-col gap-1 h-full min-h-[100px] mt-1 ">
        {listData.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              "p-2 rounded-r-md text-[10px] leading-tight flex flex-col justify-between h-full shadow-sm",
              categoryStyles[item.category]
            )}
          >
            <div>
              <div className="font-bold uppercase tracking-tighter opacity-80">{item.time}</div>
              <div className="font-semibold text-[11px] mt-1 leading-snug">{item.title}</div>
            </div>
            <div className="text-[9px] mt-2 font-bold uppercase opacity-60">
              {item.category}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!mounted) return null

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'var(--primary)',
          colorBgContainer: 'transparent',
          colorText: 'var(--foreground)',
          colorBorderSecondary: 'var(--border)',
          fontFamily: 'inherit',
        },
      }}
    ><Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Schedule for {selectedDate?.format("DD MMM YYYY")}
            </DialogTitle>
          </DialogHeader>

          <p>Add or view schedule for this date.</p>
        </DialogContent>
      </Dialog>
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Schedule</h2>
          <div className="flex items-center gap-2">
            <div className="flex bg-muted p-1 rounded-lg">
              <Button variant="ghost" size="sm" className="h-7 rounded-md px-4">Day</Button>
              <Button variant="ghost" size="sm" className="h-7 rounded-md px-4">Week</Button>
              <Button variant="default" size="sm" className="h-7 rounded-md px-4 shadow-sm">Month</Button>
            </div>
            <Button variant="outline" size="sm" className="h-9">All Category</Button>
            <Button size="sm" className="h-9 bg-violet-600 hover:bg-violet-700 text-white px-6">
              Add Schedule
            </Button>
          </div>
        </div>

        <div className="rounded-xl  bg-transparent text-card-foreground  overflow-hidden">
          <Calendar
            onSelect={handleDateSelect}
            cellRender={(current, info) =>
              info.type === "date" ? dateCellRender(current) : info.originNode
            }
          />
        </div>

        <style jsx global>{`
          .ant-picker-calendar-full .ant-picker-panel {
            background: transparent !important;
          }

          /* CUSTOMIZE CELL VISIBILITY HERE */
          .ant-picker-calendar-date {
            border-top: 1px dashed hsl(var(--border) / 0.6) !important;
            border-inline-end: 1px solid hsl(var(--border) / 0.2) !important; /* Vertical lines */
            margin: 0 !important;
            padding: 8px 4px !important;
            height: auto !important;
            min-height: 140px;
            transition: all 0.2s;
            
            /* Lightly color the cell background for visibility */
            background-color: hsl(var(--muted) / 0.3) !important; 
          }

          /* Different background for days not in the current month */
          .ant-picker-cell-next-month .ant-picker-calendar-date,
          .ant-picker-cell-prev-month .ant-picker-calendar-date {
            background-color: hsl(var(--muted) / 0.6) !important;
            opacity: 0.8;
          }

          .ant-picker-calendar-date:hover {
            background: hsl(var(--accent) / 0.8) !important;
          }

          .ant-picker-calendar-date-value {
            color: hsl(var(--muted-foreground)) !important;
            font-weight: 600;
            font-size: 13px;
          }

          .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-calendar-date {
             /* Highlight today's cell background if needed */
             background-color: hsl(var(--primary) / 0.05) !important;
          }

          .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-calendar-date-value {
             color: hsl(var(--primary)) !important;
          }

          .ant-picker-calendar-full .ant-picker-cell::before {
            border: none !important;
          }

          /* Adjust header (Sun, Mon, Tue...) background */
          .ant-picker-calendar-full .ant-picker-content th {
            padding: 12px 0 !important;
            background-color: hsl(var(--muted) / 0.5);
            color: hsl(var(--muted-foreground));
            font-weight: 600;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
          }
        `}</style>
      </div>
    </ConfigProvider>
  )
}

export default BigCalender