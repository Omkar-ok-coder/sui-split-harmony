
import { WelcomeCard } from "@/components/WelcomeCard";
import { BalanceCard } from "@/components/BalanceCard";
import { ExpenseList } from "@/components/ExpenseList";
import { SettlementsCard } from "@/components/SettlementsCard";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { Header } from "@/components/Header";
import { MembersCard } from "@/components/MembersCard";
import { useWallet } from "@/context/WalletContext";
import { Separator } from "@/components/ui/separator";
import { BookUser, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { user } = useWallet();
  const isConnected = user?.isConnected;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex items-center justify-center h-[80vh]">
            <WelcomeCard />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-suiPurple to-suiPurple-light bg-clip-text text-transparent flex items-center">
                  <DollarSign className="mr-2 h-6 w-6 text-suiPurple" /> Dashboard
                </h2>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Manage your shared expenses</p>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="flex items-center gap-2 hover:bg-suiPurple/10 hover:text-suiPurple dark:hover:text-suiPurple-light transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                    <BarChart3 size={16} /> View Analytics
                  </Button>
                </Link>
                <AddExpenseForm />
              </div>
            </div>
            
            <Separator className="bg-suiPurple/10 dark:bg-gray-700" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <ExpenseList />
                <SettlementsCard />
              </div>
              
              <div className="space-y-6">
                <BalanceCard />
                <MembersCard />
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="border-t py-4 px-4 text-center text-sm text-muted-foreground bg-white/90 dark:bg-gray-800/90 dark:text-gray-400 dark:border-gray-700 backdrop-blur-sm transition-colors">
        <div className="max-w-7xl mx-auto">
          <p>SuiSplit © {new Date().getFullYear()} - Splitting bills on Sui blockchain</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
