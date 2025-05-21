
import { useExpenses } from "@/context/ExpenseContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { useWallet } from "@/context/WalletContext";
import { Badge } from "@/components/ui/badge";

export function ExpenseList() {
  const { expenses } = useExpenses();
  const { user } = useWallet();
  
  if (!user?.isConnected) {
    return null;
  }

  if (expenses.length === 0) {
    return (
      <Card className="w-full border-suiPurple/10 shadow-sm hover:shadow-md transition-all card-hover">
        <CardHeader className="card-header-gradient">
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-suiGray-light flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-suiPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p>No expenses yet. Add your first expense to get started!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-suiPurple/10 shadow-sm hover:shadow-md transition-all card-hover">
      <CardHeader className="card-header-gradient">
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Paid by</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => {
                const isPayer = expense.payer === user?.address;
                const shortAddr = `${expense.payer.substring(0, 6)}...${expense.payer.substring(expense.payer.length - 4)}`;
                
                return (
                  <TableRow 
                    key={expense.id} 
                    className="hover:bg-gray-50 cursor-default transition-colors"
                  >
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell className="font-semibold">${expense.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {isPayer ? (
                        <Badge variant="outline" className="bg-suiPurple/10 text-suiPurple border-suiPurple/20">
                          You
                        </Badge>
                      ) : shortAddr}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{formatDistanceToNow(new Date(expense.date), { addSuffix: true })}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
