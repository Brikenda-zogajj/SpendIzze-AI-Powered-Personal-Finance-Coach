import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Trophy, Target } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  contribution: number;
}

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  participants: Participant[];
}

interface CommunityGoalsProps {
  goals?: Goal[];
  onJoinGoal?: (goalId: string) => void;
}

const defaultGoals: Goal[] = [
  {
    id: "1",
    title: "Group Vacation Fund",
    targetAmount: 2000,
    currentAmount: 1200,
    deadline: new Date("2024-08-01"),
    participants: [
      {
        id: "1",
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        contribution: 400,
      },
      {
        id: "2",
        name: "Sarah",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        contribution: 500,
      },
      {
        id: "3",
        name: "Mike",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        contribution: 300,
      },
    ],
  },
  {
    id: "2",
    title: "Emergency Fund Challenge",
    targetAmount: 5000,
    currentAmount: 2500,
    deadline: new Date("2024-12-31"),
    participants: [
      {
        id: "1",
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        contribution: 1000,
      },
      {
        id: "4",
        name: "Emma",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        contribution: 1500,
      },
    ],
  },
];

const CommunityGoals = ({
  goals = defaultGoals,
  onJoinGoal = () => {},
}: CommunityGoalsProps) => {
  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" />
          Community Goals
        </h2>
        <Button variant="outline" size="sm">
          <Target className="h-4 w-4 mr-2" />
          Create Goal
        </Button>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  {goal.title}
                  {goal.currentAmount >= goal.targetAmount && (
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Target: ${goal.targetAmount.toLocaleString()}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onJoinGoal(goal.id)}
              >
                Join Goal
              </Button>
            </div>

            <Progress
              value={(goal.currentAmount / goal.targetAmount) * 100}
              className="h-2"
            />

            <div className="flex items-center justify-between text-sm">
              <div className="flex -space-x-2">
                {goal.participants.map((participant) => (
                  <img
                    key={participant.id}
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-6 h-6 rounded-full border-2 border-white"
                    title={`${participant.name}: $${participant.contribution}`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                ${goal.currentAmount.toLocaleString()} raised
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CommunityGoals;
