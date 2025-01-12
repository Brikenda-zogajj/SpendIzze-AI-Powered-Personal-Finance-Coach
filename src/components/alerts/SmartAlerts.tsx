import React from "react";
import { Card } from "@/components/ui/card";
import { Bell, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Alert {
  id: string;
  type: "behavior" | "spending" | "goal" | "eco";
  message: string;
  timestamp: Date;
  action?: string;
}

interface SmartAlertsProps {
  alerts?: Alert[];
  onActionClick?: (alertId: string) => void;
}

const defaultAlerts: Alert[] = [
  {
    id: "1",
    type: "behavior",
    message:
      "Weekend spending is 40% higher than weekdays. Consider setting a weekend budget.",
    timestamp: new Date(),
    action: "Set Weekend Budget",
  },
  {
    id: "2",
    type: "spending",
    message: "You're approaching your dining out budget limit for this month.",
    timestamp: new Date(),
    action: "Review Budget",
  },
  {
    id: "3",
    type: "eco",
    message:
      "Switch to paperless billing to save $2/month and reduce paper waste.",
    timestamp: new Date(),
    action: "Go Paperless",
  },
];

const SmartAlerts = ({
  alerts = defaultAlerts,
  onActionClick = () => {},
}: SmartAlertsProps) => {
  return (
    <Card className="p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Smart Alerts
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-sm text-muted-foreground">
                {alerts.length} Active Alerts
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Personalized alerts based on your spending patterns
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-lg border bg-muted/50 flex items-start gap-3"
          >
            {alert.type === "behavior" && (
              <TrendingUp className="h-5 w-5 text-blue-500 mt-1" />
            )}
            {alert.type === "spending" && (
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
            )}
            {alert.type === "eco" && (
              <div className="h-5 w-5 text-green-500 mt-1">🌱</div>
            )}
            <div className="flex-1">
              <p className="text-sm">{alert.message}</p>
              {alert.action && (
                <Button
                  variant="link"
                  className="mt-2 h-auto p-0 text-primary"
                  onClick={() => onActionClick(alert.id)}
                >
                  {alert.action} →
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SmartAlerts;
