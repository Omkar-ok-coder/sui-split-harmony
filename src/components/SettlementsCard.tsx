
import { useExpenses } from "@/context/ExpenseContext";
import { useWallet } from "@/context/WalletContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SettlementsCard() {
  const { user } = useWallet();
  const { settlements, settleDebt } = useExpenses();
  
  if (!user?.isConnected) {
    return null;
  }

  // Filter settlements related to current user
  const userSettlements = settlements.filter(
    s => s.from === user.address || s.to === user.address
  );

  if (userSettlements.length === 0) {
    return (
      <Card className="border-suiPurple/10 shadow-sm hover:shadow-md transition-all card-hover">
        <CardHeader className="card-header-gradient">
          <CardTitle>Settlements</CardTitle>
          <CardDescription>No settlements needed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-medium text-green-600">All settled up!</p>
            <p className="mt-1 text-sm">No payments needed.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-suiPurple/10 shadow-sm hover:shadow-md transition-all card-hover">
      <CardHeader className="card-header-gradient">
        <CardTitle>Settlements</CardTitle>
        <CardDescription>Payments needed to settle balances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userSettlements.map((settlement, index) => {
            const isPayment = settlement.from === user.address;
            const otherUser = isPayment ? settlement.to : settlement.from;
            const shortAddr = `${otherUser.substring(0, 6)}...${otherUser.substring(otherUser.length - 4)}`;
            
            return (
              <div 
                key={index} 
                className={`flex justify-between items-center py-3 px-4 border-b last:border-0 rounded-md ${isPayment ? 'bg-red-50 hover:bg-red-100' : 'bg-green-50 hover:bg-green-100'} transition-colors`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {isPayment ? `Pay ${shortAddr}` : `Receive from ${shortAddr}`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ${settlement.amount.toFixed(2)}
                  </span>
                </div>
                {isPayment && (
                  <Button 
                    size="sm" 
                    onClick={() => settleDebt(settlement.from, settlement.to, settlement.amount)}
                    className="bg-suiPurple hover:bg-suiPurple-dark button-3d"
                  >
                    Settle <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
