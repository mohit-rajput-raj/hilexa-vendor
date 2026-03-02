"use client"

import * as React from "react"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

// Updated data to reflect the positive/negative structure in your image
const chartData = [
  { date: "12 Jun", positive: 28000, negative: -25000 },
  { date: "13 Jun", positive: 22000, negative: -5000 },
  { date: "14 Jun", positive: 16000, negative: -12000 },
  { date: "15 Jun", positive: 21000, negative: -8000 },
  { date: "16 Jun", positive: 24000, negative: -28000 },
  { date: "17 Jun", positive: 19000, negative: -8000 },
  { date: "18 Jun", positive: 23000, negative: -12000 },
]

const chartConfig = {
  positive: {
    label: "Positive",
    color: "#D1FAE5", // Sage Green from image
  },
  negative: {
    label: "Negative",
    color: "#8B5CF6", // Violet from image
  },
} satisfies ChartConfig

export function ReviewStatistics() {
  return (
    <Card className="max-w-full rounded-2xl shadow-sm border bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between ">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">Review Statistics</CardTitle>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#D1FAE5]" />
              <span className="text-xs text-muted-foreground font-medium">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#8B5CF6]" />
              <span className="text-xs text-muted-foreground font-medium">Negative</span>
            </div>
          </div>
        </div>
        <Button variant="secondary" size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg h-9 px-4 gap-2">
          <CalendarIcon className="h-4 w-4" />
          Last 7 Days
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="px-2">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart 
            data={chartData} 
            margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
            barGap={8}
          >
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              opacity={0.4}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              className="text-[11px] font-medium text-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-[11px] font-medium text-muted-foreground"
              // Formats 30000 -> 30K
              tickFormatter={(value) => `${value / 1000 === 0 ? 0 : value / 1000 + "K"}`}
              domain={[-30000, 30000]}
              ticks={[-30000, -15000, 0, 15000, 30000]}
            />
            <ChartTooltip
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
              content={<ChartTooltipContent hideLabel />}
            />
            
            {/* Horizontal line at 0 */}
            <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1} />

            <Bar
              dataKey="positive"
              fill={chartConfig.positive.color}
              radius={[4, 4, 0, 0]} // Round only top
              barSize={18}
            />
            <Bar
              dataKey="negative"
              fill={chartConfig.negative.color}
              radius={[4, 4, 0, 0]} // Round only bottom (since negative)
              barSize={18}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}