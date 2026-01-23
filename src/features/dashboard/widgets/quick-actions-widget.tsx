import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Users, Settings } from "lucide-react";
import type { WidgetProps } from "../types";

const actions = [
  { id: 1, label: "New Task", icon: Plus },
  { id: 2, label: "Reports", icon: FileText },
  { id: 3, label: "Team", icon: Users },
  { id: 4, label: "Settings", icon: Settings },
];

export function QuickActionsWidget(_props: WidgetProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto flex-col gap-1 py-3"
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
