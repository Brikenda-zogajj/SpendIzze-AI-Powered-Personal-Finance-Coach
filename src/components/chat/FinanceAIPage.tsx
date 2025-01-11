import React from "react";
import FinanceAIChat from "./FinanceAIChat";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinanceAIPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Financial Assistant</h1>
        </div>
      </header>

      <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
          <FinanceAIChat />
        </div>
      </div>
    </div>
  );
};

export default FinanceAIPage;
