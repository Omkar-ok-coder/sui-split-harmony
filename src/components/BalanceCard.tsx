
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
import { Wallet, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export function BalanceCard() {
  const { user } = useWallet();
  const { userBalances, generateSettlements } = useExpenses();
  const [showDetails, setShowDetails] = useState(false);
  
  if (!user?.isConnected) {
    return null;
  }

  if (!userBalances) {
    return (
      <Card className="h-full border-suiPurple/10 shadow-sm hover:shadow transition-all card-hover">
        <CardHeader className="card-header-gradient">
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
      <CardHeader className="pb-2 card-header-gradient">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full sui-gradient-bg flex items-center justify-center shadow-sm">
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <CardTitle>Your Balance</CardTitle>
          </div>
          <div className={`text-lg font-bold rounded-full px-3 py-1 ${netBalance > 0 ? 'text-green-600 bg-green-50' : netBalance < 0 ? 'text-red-600 bg-red-50' : 'text-gray-500 bg-gray-50'}`}>
            ${Math.abs(netBalance).toFixed(2)}
          </div>
        </div>
        <CardDescription>
          Your current group balance
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-100">
                  You owe
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-100">
                  Owed to you
                </span>
              </div>
            </div>
            <Progress value={owedPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-center pt-2">
            <div className="bg-red-50 p-3 rounded-md transition-all hover:shadow-md">
              <p className="text-xs text-muted-foreground mb-1">You owe</p>
              <p className="text-red-600 font-semibold">${owesTotal.toFixed(2)}</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-md transition-all hover:shadow-md">
              <p className="text-xs text-muted-foreground mb-1">You are owed</p>
              <p className="text-green-600 font-semibold">${owedTotal.toFixed(2)}</p>
            </div>
          </div>
          
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)} 
              className="w-full text-xs text-muted-foreground hover:text-suiPurple"
            >
              {showDetails ? "Hide" : "Show"} Details <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {showDetails && Object.keys(owes).length > 0 && (
            <div className="pt-3">
              <p className="text-xs text-muted-foreground mb-2">You owe:</p>
              <div className="space-y-2">
                {Object.entries(owes).map(([address, amount]) => (
                  <div key={address} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
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
          className="w-full bg-suiPurple hover:bg-suiPurple-dark transition-all duration-300 button-3d"
        >
          <span>Settle Up</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
