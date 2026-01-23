import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import type { WidgetProps } from "../types";

const chartData = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 173 },
  { month: "May", value: 209 },
  { month: "Jun", value: 314 },
];

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
};

export function ChartWidget(_props: WidgetProps) {
  return (
    <Card className="h-full px-0">
      <CardHeader>
        <CardTitle className="text-md font-medium">
          Analytics Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full"
        >
          <AreaChart data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.3}
              stroke="var(--color-value)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
