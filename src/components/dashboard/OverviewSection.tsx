import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

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
  return (
    <div className="w-full bg-background p-6">
      <h2 className="text-2xl font-semibold mb-6">Financial Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card className="p-6 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Balance</span>
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div className="text-2xl font-bold">
            ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-muted-foreground">Available funds</div>
        </Card>

        {/* Income Card */}
        <Card className="p-6 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Monthly Income</span>
            <ArrowUpCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-500">
            ${income.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-muted-foreground">
            Total earnings this month
          </div>
        </Card>

        {/* Expenses Card */}
        <Card className="p-6 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Monthly Expenses</span>
            <ArrowDownCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-red-500">
            ${expenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-muted-foreground">
            Total spending this month
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;
