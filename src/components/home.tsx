import React from "react";
import OverviewSection from "./dashboard/OverviewSection";
import SpendingDonutChart from "./dashboard/SpendingDonutChart";
import TransactionList from "./transactions/TransactionList";
import TransactionModal from "./transactions/TransactionModal";
import CategoryManager from "./categories/CategoryManager";
import SmartAlerts from "./alerts/SmartAlerts";
import CommunityGoals from "./goals/CommunityGoals";
import EcoFinanceCard from "./eco/EcoFinanceCard";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";
import ProfileButton from "./profile/ProfileButton";
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
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/assistant")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Financial Assistant
            </Button>
            <ProfileButton onLogout={handleLogout} />
          </div>
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
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Charts and Insights */}
          <div className="lg:col-span-4 space-y-8">
            <SpendingDonutChart />
            <SmartAlerts
              onActionClick={(alertId) => {
                // Handle alert actions
                console.log("Alert clicked:", alertId);
              }}
            />
            <EcoFinanceCard />
          </div>

          {/* Middle Column - Transactions */}
          <div className="lg:col-span-5">
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

          {/* Right Column - Community Goals */}
          <div className="lg:col-span-3">
            <CommunityGoals
              onJoinGoal={(goalId) => {
                // Handle goal join
                console.log("Goal joined:", goalId);
              }}
            />
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
