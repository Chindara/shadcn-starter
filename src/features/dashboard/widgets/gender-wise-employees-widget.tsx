import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { WidgetProps } from "../types";
import { User } from "lucide-react";

// const chartData = [
//   { month: "Jan", value: 186 },
//   { month: "Feb", value: 305 },
//   { month: "Mar", value: 237 },
//   { month: "Apr", value: 173 },
//   { month: "May", value: 209 },
//   { month: "Jun", value: 314 },
// ];

// const chartConfig: ChartConfig = {
//   value: {
//     label: "Value",
//     color: "hsl(var(--primary))",
//   },
// };

const chartConfig: ChartConfig = {
  employees: { label: "Employees" },
  female: { label: "Female", color: "var(--chart-8)" },
  male: { label: "Male", color: "var(--chart-1)" },
};

const chartData = [
  { group: "female", employees: 10, fill: "var(--chart-8)" },
  { group: "male", employees: 15, fill: "var(--chart-9)" },
];

export function GenderWiseEmployeesWidget(_props: WidgetProps) {
  return (
    <Card className="h-full px-0">
      <CardHeader>
        <CardTitle className="text-md font-medium">
          Gender wise Employees
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        <div className="flex h-full gap-4 pb-8">
          {/* Chart section */}
          <div className="flex-1 flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="aspect-square w-full [&_.recharts-responsive-container]:!h-full"
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient
                      id="maleGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#60a5fa"
                      />
                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                      />
                    </linearGradient>
                    <linearGradient
                      id="femaleGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#f472b6"
                      />
                      <stop
                        offset="100%"
                        stopColor="#ec4899"
                      />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={chartData}
                    dataKey="employees"
                    nameKey="group"
                    innerRadius={55}
                    outerRadius={80}
                    cx="50%"
                    cy="50%"
                    strokeWidth={0}
                    paddingAngle={3}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {25}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Employees
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Right side panel */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-1">
            {/* Male */}
            <div className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200/50">
              <div className="flex items-center gap-2 mb-0">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Male</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-xl font-bold text-blue-600">15%</div>
              </div>
            </div>

            {/* Female */}
            <div className="w-full p-3 rounded-lg bg-pink-50 border border-pink-200/50">
              <div className="flex items-center gap-2 mb-0">
                <User className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-slate-700">
                  Female
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-pink-600">10</div>
                <div className="text-xl font-bold text-pink-600">10%</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
