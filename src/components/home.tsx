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
import { Plus, MessageSquare, Menu, BellRing } from "lucide-react";
import ProfileButton from "./profile/ProfileButton";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => navigate("/dashboard/assistant")}
                  >
                    AI Assistant
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => navigate("/dashboard/settings")}
                  >
                    Settings
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold">Financial Dashboard</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <BellRing className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/assistant")}
              className="hidden md:flex"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <ProfileButton onLogout={handleLogout} />
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container mx-auto p-4 lg:p-8 space-y-8">
          {/* Overview Section */}
          <OverviewSection
            balance={initialBalance}
            income={initialIncome}
            expenses={initialExpenses}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Charts and Insights */}
            <div className="lg:col-span-4 space-y-8">
              <SpendingDonutChart />
              <SmartAlerts
                onActionClick={(alertId) => {
                  console.log("Alert clicked:", alertId);
                }}
              />
              <EcoFinanceCard />
            </div>

            {/* Middle Column - Transactions */}
            <div className="lg:col-span-5">
              <div className="sticky top-[5rem] bg-gray-50 z-10 pb-4 mb-4 flex justify-between gap-4">
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
              <div className="sticky top-[5rem]">
                <CommunityGoals
                  onJoinGoal={(goalId) => {
                    console.log("Goal joined:", goalId);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Modals */}
      <TransactionModal
        open={showTransactionModal}
        onOpenChange={setShowTransactionModal}
        onSubmit={() => {
          setShowTransactionModal(false);
        }}
      />

      <CategoryManager
        open={showCategoryManager}
        onOpenChange={setShowCategoryManager}
        onSave={() => {
          setShowCategoryManager(false);
        }}
      />
    </div>
  );
};

export default Home;
