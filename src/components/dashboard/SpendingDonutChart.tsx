import React from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Wallet } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
}

interface Props {
  categories?: SpendingCategory[];
  totalSpending?: number;
}

const defaultCategories: SpendingCategory[] = [
  { name: "Housing", amount: 1200, color: "#FF6B6B" },
  { name: "Food", amount: 400, color: "#4ECDC4" },
  { name: "Transportation", amount: 200, color: "#45B7D1" },
  { name: "Entertainment", amount: 150, color: "#96CEB4" },
  { name: "Others", amount: 250, color: "#FFEEAD" },
];

const SpendingDonutChart = ({
  categories = defaultCategories,
  totalSpending = categories.reduce((sum, cat) => sum + cat.amount, 0),
}: Props) => {
  const radius = 150;
  const strokeWidth = 40;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <Card className="p-6 w-[400px] h-[400px] bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Spending Breakdown
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4" />
                Total: ${totalSpending}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Total spending across all categories
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="relative w-full h-[300px] flex justify-center">
        <svg
          width={center * 2}
          height={center * 2}
          className="transform -rotate-90"
        >
          {categories.map((category, index) => {
            const percentage = category.amount / totalSpending;
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference * (1 - percentage);
            const offset = currentOffset;
            currentOffset += percentage * circumference;

            return (
              <circle
                key={index}
                r={radius}
                cx={center}
                cy={center}
                fill="none"
                stroke={category.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transform: `rotate(${offset}px)`,
                  transformOrigin: "center",
                  transition: "stroke-dashoffset 0.5s ease",
                }}
              />
            );
          })}
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm">{category.name}</span>
            <span className="text-sm text-muted-foreground ml-auto">
              ${category.amount}
            </span>
          </div>
        ))}
      </div>
      <div className="w-[800px] h-[600px]"></div>
    </Card>
  );
};

export default SpendingDonutChart;
