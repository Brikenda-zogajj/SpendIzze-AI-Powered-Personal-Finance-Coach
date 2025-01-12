import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  type: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

interface FinanceAIChatProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    content: "Hi! I'm your AI financial advisor. I can help you with:",
    type: "ai",
    timestamp: new Date(),
    suggestions: [
      "💰 Analyze my spending patterns",
      "💡 Get savings recommendations",
      "📊 Review my budget",
      "🎯 Set financial goals",
    ],
  },
];

const FinanceAIChat = ({
  messages = defaultMessages,
  onSendMessage = () => {},
}: FinanceAIChatProps) => {
  const [input, setInput] = React.useState("");
  const [localMessages, setLocalMessages] = React.useState(messages);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        type: "user",
        timestamp: new Date(),
      };

      // Simulate AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(input),
        type: "ai",
        timestamp: new Date(),
        suggestions: generateSuggestions(input),
      };

      setLocalMessages([...localMessages, userMessage, aiResponse]);
      onSendMessage(input);
      setInput("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages]);

  return (
    <Card className="flex flex-col h-[600px] bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Financial Advisor
          <Sparkles className="h-4 w-4 text-yellow-500" />
        </h2>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {localMessages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`p-3 rounded-lg ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {message.content}
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="secondary"
                          className="w-full text-left justify-start text-sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-start pt-1">
                  {message.type === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your finances..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
};

// Helper functions for AI responses
const generateAIResponse = (input: string): string => {
  const responses = {
    spending:
      "Based on your recent transactions, I notice you've spent 30% more on dining out this month compared to last month. Would you like me to suggest some ways to reduce these expenses?",
    savings:
      "I've analyzed your spending patterns and found potential savings of $245/month by optimizing your subscriptions and recurring bills. Would you like to see the breakdown?",
    budget:
      "Your current budget utilization is at 75%. You're doing well in most categories, but entertainment expenses are slightly over budget. Should we review the details?",
    goals:
      "I can help you set up a realistic savings goal based on your income and spending patterns. Would you like to explore some options?",
  };

  const lowercaseInput = input.toLowerCase();
  if (lowercaseInput.includes("spend")) return responses.spending;
  if (lowercaseInput.includes("save")) return responses.savings;
  if (lowercaseInput.includes("budget")) return responses.budget;
  if (lowercaseInput.includes("goal")) return responses.goals;

  return "I can help you analyze your finances, set budgets, and reach your financial goals. What would you like to know?";
};

const generateSuggestions = (input: string): string[] => {
  const lowercaseInput = input.toLowerCase();
  if (lowercaseInput.includes("spend")) {
    return [
      "📊 Show my spending breakdown",
      "💡 How can I reduce expenses?",
      "🔍 Analyze my largest expenses",
    ];
  }
  if (lowercaseInput.includes("save")) {
    return [
      "💰 Show savings opportunities",
      "📈 Create a savings plan",
      "🎯 Set a savings goal",
    ];
  }
  return [];
};

export default FinanceAIChat;
