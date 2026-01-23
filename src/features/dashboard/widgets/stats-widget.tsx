import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { WidgetProps } from "../types";

export function StatsWidget(_props: WidgetProps) {
  const stats = [
    { label: "Total Users", value: "2,543", change: 12.5, isPositive: true },
    {
      label: "Active Sessions",
      value: "1,234",
      change: -2.3,
      isPositive: false,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(stat.change)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
