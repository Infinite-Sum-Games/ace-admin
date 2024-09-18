"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

  const chartConfig = {
    attendees: {
      label: "Attendees",
      color: "hsl(var(--primary))", 
    },
  } satisfies ChartConfig;

const chartData = [
  { month: "January", attendees: 186 },
  { month: "February", attendees: 305 },
  { month: "March", attendees: 237 },
  { month: "April", attendees: 73 },
  { month: "May", attendees: 209 },
  { month: "June", attendees: 214 },
  { month: "July", attendees: 190 },
  { month: "August", attendees: 290 },
  { month: "September", attendees: 120 },
  { month: "October", attendees: 400 },
  { month: "November", attendees: 350 },
  { month: "December", attendees: 225 },
]

export function Overview() {
  return (
    <Card className="border-[hsl(var(--border))]">
      <CardHeader>
        <CardTitle>Event Attendees</CardTitle>
        <CardDescription>Number of Attendees per Month</CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} className=" min-h-[500] w-full">
            <CartesianGrid 
              stroke="hsl(var(--border))"
              vertical={false} 
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: "hsl(var(--foreground))" }} 
            />
            <YAxis
              tick={{ fill: "hsl(var(--foreground))" }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))", 
                color: "hsl(var(--popover-foreground))", 
              }}
              cursor={{ fill: "hsl(var(--muted))" }} 
            />
            <Bar 
              dataKey="attendees" 
              fill="hsl(var(--primary))"
              radius={8} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}