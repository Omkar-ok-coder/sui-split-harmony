
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

export function ExpenseList() {
  const { expenses } = useExpenses();
  const { user } = useWallet();
  
  if (!user?.isConnected) {
    return null;
  }

  if (expenses.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No expenses yet. Add your first expense to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
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
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{isPayer ? `${shortAddr} (You)` : shortAddr}</TableCell>
                  <TableCell>{formatDistanceToNow(new Date(expense.date), { addSuffix: true })}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
