
import { WelcomeCard } from "@/components/WelcomeCard";
import { BalanceCard } from "@/components/BalanceCard";
import { ExpenseList } from "@/components/ExpenseList";
import { SettlementsCard } from "@/components/SettlementsCard";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { Header } from "@/components/Header";
import { MembersCard } from "@/components/MembersCard";
import { useWallet } from "@/context/WalletContext";

const Index = () => {
  const { user } = useWallet();
  const isConnected = user?.isConnected;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex items-center justify-center h-[80vh]">
            <WelcomeCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <AddExpenseForm />
              </div>
              
              <ExpenseList />
              <SettlementsCard />
            </div>
            
            <div className="space-y-6">
              <BalanceCard />
              <MembersCard />
            </div>
          </div>
        )}
      </main>
      
      <footer className="border-t py-4 px-4 text-center text-sm text-muted-foreground">
        <p>SuiSplit © {new Date().getFullYear()} - Splitting bills on Sui blockchain</p>
      </footer>
    </div>
  );
};

export default Index;
