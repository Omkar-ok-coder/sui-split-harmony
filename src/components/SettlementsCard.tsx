
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
      <Card>
        <CardHeader>
          <CardTitle>Settlements</CardTitle>
          <CardDescription>No settlements needed</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            All settled up! No payments needed.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
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
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
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
                    className="bg-suiPurple hover:bg-suiPurple-dark"
                  >
                    Settle
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
