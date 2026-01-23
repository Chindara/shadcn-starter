import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { WidgetProps } from "../types";

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "created a new task",
    time: "2 min ago",
    initials: "JD",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "completed project",
    time: "15 min ago",
    initials: "JS",
  },
  {
    id: 3,
    user: "Bob Wilson",
    action: "uploaded a file",
    time: "1 hour ago",
    initials: "BW",
  },
  {
    id: 4,
    user: "Alice Brown",
    action: "left a comment",
    time: "2 hours ago",
    initials: "AB",
  },
];

export function RecentActivityWidget(_props: WidgetProps) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">
                    {activity.action}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
