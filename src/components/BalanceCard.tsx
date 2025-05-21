
import { useExpenses } from "@/context/ExpenseContext";
import { useWallet } from "@/context/WalletContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Wallet, ArrowRight } from "lucide-react";

export function BalanceCard() {
  const { user } = useWallet();
  const { userBalances, generateSettlements } = useExpenses();
  
  if (!user?.isConnected) {
    return null;
  }

  if (!userBalances) {
    return (
      <Card className="h-full border-suiPurple/10 shadow-sm hover:shadow transition-all">
        <CardHeader>
          <CardTitle>Your Balance</CardTitle>
          <CardDescription>
            Loading balances...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <div className="animate-pulse-slow">
            <Wallet className="h-12 w-12 text-muted-foreground opacity-50" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const { netBalance, owes, owed } = userBalances;
  const owesTotal = Object.values(owes).reduce((sum, amount) => sum + amount, 0);
  const owedTotal = Object.values(owed).reduce((sum, amount) => sum + amount, 0);
  
  // Calculate the percentage for the progress bar (what percentage of total is owed to you)
  const total = owesTotal + owedTotal;
  const owedPercentage = total > 0 ? (owedTotal / total) * 100 : 0;

  return (
    <Card className="h-full border-suiPurple/10 shadow-sm hover:shadow-md transition-all card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Your Balance</CardTitle>
          <div className={`text-lg font-bold ${netBalance > 0 ? 'text-green-600' : netBalance < 0 ? 'text-red-600' : 'text-gray-500'}`}>
            {netBalance > 0 ? '+' : ''}{netBalance.toFixed(2)}
          </div>
        </div>
        <CardDescription>
          Your current group balance
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          <Progress value={owedPercentage} className="h-2" />
          
          <div className="grid grid-cols-2 gap-2 text-center pt-2">
            <div className="bg-red-50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">You owe</p>
              <p className="text-red-600 font-semibold">${owesTotal.toFixed(2)}</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">You are owed</p>
              <p className="text-green-600 font-semibold">${owedTotal.toFixed(2)}</p>
            </div>
          </div>
          
          {Object.keys(owes).length > 0 && (
            <div className="pt-3">
              <p className="text-xs text-muted-foreground mb-2">You owe:</p>
              <div className="space-y-2">
                {Object.entries(owes).map(([address, amount]) => (
                  <div key={address} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md">
                    <span className="truncate max-w-[150px]">{`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}</span>
                    <span className="text-red-600 font-medium">${amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={generateSettlements} 
          className="w-full bg-suiPurple hover:bg-suiPurple-dark transition-all duration-300 button-hover"
        >
          <span>Settle Up</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
