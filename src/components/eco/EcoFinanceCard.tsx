import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp } from "lucide-react";

interface EcoMetrics {
  paperlessSavings: number;
  sustainableChoices: number;
  carbonFootprint: number;
  ecoScore: number;
}

interface EcoFinanceCardProps {
  metrics?: EcoMetrics;
}

const defaultMetrics: EcoMetrics = {
  paperlessSavings: 45.5,
  sustainableChoices: 12,
  carbonFootprint: 75,
  ecoScore: 85,
};

const EcoFinanceCard = ({ metrics = defaultMetrics }: EcoFinanceCardProps) => {
  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-500" />
          Eco-Finance Impact
        </h2>
        <div className="text-sm text-muted-foreground">Updated Daily</div>
      </div>

      <div className="space-y-6">
        {/* Eco Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Eco Score</span>
            <span className="font-medium">{metrics.ecoScore}/100</span>
          </div>
          <Progress value={metrics.ecoScore} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-500">
              ${metrics.paperlessSavings}
            </div>
            <div className="text-sm text-muted-foreground">
              Paperless Savings
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-500">
              {metrics.sustainableChoices}
            </div>
            <div className="text-sm text-muted-foreground">
              Sustainable Choices
            </div>
          </div>
        </div>

        {/* Carbon Footprint */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Carbon Footprint</span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold">{metrics.carbonFootprint}%</div>
          <div className="text-sm text-muted-foreground">
            Lower than average
          </div>
        </div>

        {/* Tips */}
        <div className="text-sm text-muted-foreground">
          🌱 Tip: Switch to e-statements to save $2/month and reduce paper waste
        </div>
      </div>
    </Card>
  );
};

export default EcoFinanceCard;
