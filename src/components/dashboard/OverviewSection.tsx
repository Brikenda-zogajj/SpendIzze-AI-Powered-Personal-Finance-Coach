import React from "react";
import { Card } from "@/components/ui/card";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OverviewSectionProps {
  balance?: number;
  income?: number;
  expenses?: number;
}

const OverviewSection = ({
  balance = 25000.0,
  income = 8500.0,
  expenses = 3200.0,
}: OverviewSectionProps) => {
  // Calculate savings rate
  const savingsRate = ((income - expenses) / income) * 100;
  const monthProgress = (new Date().getDate() / 30) * 100;
  const budgetProgress = (expenses / income) * 100;

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground/80">Total Balance</span>
              <Wallet className="h-5 w-5 text-primary-foreground/80" />
            </div>
            <div className="text-3xl font-bold">
              ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <TrendingUp className="h-4 w-4" />
              <span>+2.5% from last month</span>
            </div>
          </div>
        </Card>

        {/* Income Card */}
        <Card className="p-6 relative overflow-hidden bg-white">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Monthly Income</span>
              <ArrowUpCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-500">
              ${income.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Month Progress</span>
                <span className="font-medium">
                  {Math.round(monthProgress)}%
                </span>
              </div>
              <Progress value={monthProgress} className="h-2" />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-green-500/10 rounded-full" />
        </Card>

        {/* Expenses Card */}
        <Card className="p-6 relative overflow-hidden bg-white">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Monthly Expenses</span>
              <ArrowDownCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500">
              ${expenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Budget Used</span>
                <span className="font-medium">
                  {Math.round(budgetProgress)}%
                </span>
              </div>
              <Progress
                value={budgetProgress}
                className="h-2"
                indicatorClassName={budgetProgress > 75 ? "bg-red-500" : ""}
              />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-red-500/10 rounded-full" />
        </Card>
      </div>

      {/* Savings Rate Card */}
      <Card className="p-6 bg-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Monthly Savings Rate</h3>
            <span className="text-sm text-muted-foreground">
              Target: 20% of income
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Rate</span>
              <span className="font-medium">{Math.round(savingsRate)}%</span>
            </div>
            <Progress
              value={savingsRate}
              className="h-3"
              indicatorClassName={`bg-gradient-to-r ${savingsRate >= 20 ? "from-green-500 to-emerald-500" : "from-orange-500 to-red-500"}`}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {savingsRate >= 20
              ? "Great job! You're meeting your savings target."
              : "Try to increase your savings to reach the 20% target."}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default OverviewSection;
