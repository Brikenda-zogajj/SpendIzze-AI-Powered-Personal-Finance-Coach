import React from "react";
import OverviewSection from "./dashboard/OverviewSection";
import SpendingDonutChart from "./dashboard/SpendingDonutChart";
import TransactionList from "./transactions/TransactionList";
import TransactionModal from "./transactions/TransactionModal";
import CategoryManager from "./categories/CategoryManager";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import FinanceAIChat from "./chat/FinanceAIChat";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  initialBalance?: number;
  initialIncome?: number;
  initialExpenses?: number;
}

const Home = ({
  initialBalance = 25000.0,
  initialIncome = 8500.0,
  initialExpenses = 3200.0,
}: HomeProps) => {
  const [showTransactionModal, setShowTransactionModal] = React.useState(false);
  const [showCategoryManager, setShowCategoryManager] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Financial Dashboard</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-8">
        {/* Overview Section */}
        <OverviewSection
          balance={initialBalance}
          income={initialIncome}
          expenses={initialExpenses}
        />

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Spending Chart */}
          <div>
            <SpendingDonutChart />
          </div>

          {/* Right Column - Transaction List */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex justify-between gap-4">
              <Button
                onClick={() => setShowCategoryManager(true)}
                variant="outline"
              >
                Manage Categories
              </Button>
              <Button onClick={() => setShowTransactionModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </Button>
            </div>
            <TransactionList
              onEdit={() => setShowTransactionModal(true)}
              onDelete={() => {
                // Handle delete
              }}
            />
          </div>

          {/* AI Chat Column */}
          <div>
            <FinanceAIChat />
          </div>
        </div>

        {/* Modals */}
        <TransactionModal
          open={showTransactionModal}
          onOpenChange={setShowTransactionModal}
          onSubmit={() => {
            setShowTransactionModal(false);
            // Handle submit
          }}
        />

        <CategoryManager
          open={showCategoryManager}
          onOpenChange={setShowCategoryManager}
          onSave={() => {
            setShowCategoryManager(false);
            // Handle save
          }}
        />
      </div>
    </div>
  );
};

export default Home;
