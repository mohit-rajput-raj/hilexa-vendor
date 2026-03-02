"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

export function OverallRating() {
  // Data matching reference image: 4.6 out of 5
  const chartData = [{ month: "january", desktop: 1260, mobile: 570 }]
  const totalVisitors = chartData[0].desktop + chartData[0].mobile

  return (
    <Card className="max-w-full rounded-2xl shadow-sm border bg-card text-card-foreground overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold tracking-tight">Overall Rating</CardTitle>
        <Button variant="secondary" size="sm" className="h-8 bg-violet-600 hover:bg-violet-700 text-white rounded-lg gap-1 px-3">
          This Week <ChevronDown className="h-3 w-3" />
        </Button>
      </CardHeader>
      
      <CardContent className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 items-start pt-2">
        {/* Left Side: Radial Gauge & Summary Block */}
        <div className="flex flex-col items-center gap-3">
          <ChartContainer config={chartConfig} className="aspect-square w-full max-w-[150px]">
           <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={55}   /* Smaller radius to fit side-by-side */
        outerRadius={85}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 10}
                      className="fill-foreground text-xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 10}
                      className="fill-muted-foreground text-[10px]"
                    >
                      Visitors
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="desktop"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-desktop)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="mobile"
          fill="var(--color-mobile)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
          </ChartContainer>

          {/* Purple Summary Block matching image */}
          <div className="w-full bg-violet-600 text-white p-3 rounded-xl text-center shadow-md">
            <p className="text-lg font-bold">Impressive</p>
            <p className="text-[10px] opacity-80 font-medium tracking-wide">from 2546 reviews</p>
          </div>
        </div>

        {/* Right Side: Linear Progress Bars */}
        <div className="space-y-4 pt-4">
          <RatingRow label="Facilities" score={4.4} value={88} />
          <RatingRow label="Cleanliness" score={4.4} value={88} />
          <RatingRow label="Services" score={4.6} value={92} />
          <RatingRow label="Comfort" score={4.8} value={96} />
          <RatingRow label="Food and Dining" score={4.5} value={90} />
        </div>
      </CardContent>
    </Card>
  )
}

function RatingRow({ label, score, value }: { label: string; score: number; value: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] font-semibold mb-1.5">
        <span className="text-muted-foreground tracking-tight">{label}</span>
        <span className="text-foreground">{score.toFixed(1)}</span>
      </div>
      {/* Light sage green progress bars matching the image style */}
      <Progress value={value} className="h-1.5 bg-zinc-200 [&>div]:bg-[#C2D9C8]" />
    </div>
  )
}