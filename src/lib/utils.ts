import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const analyzeTransactions = (transactions: any[]) => {
  // Group transactions by category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction;
    if (!acc[category]) acc[category] = 0;
    acc[category] += type === "expense" ? amount : 0;
    return acc;
  }, {});

  // Calculate total spending
  const totalSpending = Object.values(categoryTotals).reduce(
    (a: any, b: any) => a + b,
    0,
  );

  // Calculate category percentages
  const categoryAnalysis = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      amount,
      percentage: ((amount as number) / totalSpending) * 100,
    }),
  );

  // Sort by amount descending
  return categoryAnalysis.sort(
    (a, b) => (b.amount as number) - (a.amount as number),
  );
};

export const generateSavingsTips = (transactions: any[]) => {
  const analysis = analyzeTransactions(transactions);
  const tips = [];

  // Generate tips based on spending patterns
  if (analysis.length > 0) {
    const topCategory = analysis[0];
    tips.push(
      `Your highest spending category is ${topCategory.category} at ${topCategory.percentage.toFixed(1)}% of total expenses.`,
    );

    // Add category-specific tips
    switch (topCategory.category.toLowerCase()) {
      case "food":
        tips.push("Consider meal prepping to reduce food expenses.");
        break;
      case "entertainment":
        tips.push("Look for free or low-cost entertainment alternatives.");
        break;
      case "transportation":
        tips.push("Consider carpooling or public transportation options.");
        break;
      default:
        tips.push(
          "Review your expenses in this category for potential savings.",
        );
    }
  }

  return tips;
};

export const predictMonthlyExpenses = (transactions: any[]) => {
  // Group transactions by month
  const monthlyTotals = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).getMonth();
    if (!acc[month]) acc[month] = 0;
    acc[month] += transaction.type === "expense" ? transaction.amount : 0;
    return acc;
  }, {});

  // Calculate average monthly spending
  const months = Object.keys(monthlyTotals).length;
  const totalSpending = Object.values(monthlyTotals).reduce(
    (a: any, b: any) => a + b,
    0,
  );
  const averageMonthly = totalSpending / months;

  return {
    averageMonthly,
    predictedNext: averageMonthly * 1.1, // Add 10% buffer
    monthlyTotals,
  };
};
