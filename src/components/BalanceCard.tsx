
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

export function BalanceCard() {
  const { user } = useWallet();
  const { userBalances, generateSettlements } = useExpenses();
  
  if (!user?.isConnected) {
    return null;
  }

  if (!userBalances) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Balance</CardTitle>
          <CardDescription>
            Loading balances...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { netBalance, owes, owed } = userBalances;
  const owesTotal = Object.values(owes).reduce((sum, amount) => sum + amount, 0);
  const owedTotal = Object.values(owed).reduce((sum, amount) => sum + amount, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Balance</CardTitle>
        <CardDescription>
          Your current group balance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Net Balance:</div>
            <div className={`text-lg font-bold ${netBalance > 0 ? 'text-green-600' : netBalance < 0 ? 'text-red-600' : ''}`}>
              {netBalance > 0 ? '+' : ''}{netBalance.toFixed(2)}
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="text-sm font-medium">You owe:</div>
            <div className="text-red-600">{owesTotal.toFixed(2)}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">You are owed:</div>
            <div className="text-green-600">{owedTotal.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={generateSettlements} 
          className="w-full bg-suiPurple hover:bg-suiPurple-dark"
        >
          Settle Up
        </Button>
      </CardFooter>
    </Card>
  );
}
