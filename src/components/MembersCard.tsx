
import { useExpenses } from "@/context/ExpenseContext";
import { useWallet } from "@/context/WalletContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddMemberForm } from "./AddMemberForm";

export function MembersCard() {
  const { user } = useWallet();
  const { groupMembers } = useExpenses();
  
  if (!user?.isConnected) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Group Members</CardTitle>
          <CardDescription>People in your expense group</CardDescription>
        </div>
        <AddMemberForm />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {groupMembers.map((address) => {
            const shortAddr = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
            const isCurrentUser = user?.address === address;
            
            return (
              <div key={address} className="flex items-center p-2 rounded-md bg-secondary">
                <div className="h-6 w-6 rounded-full bg-suiPurple flex items-center justify-center text-white text-xs mr-2">
                  {shortAddr.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {isCurrentUser ? `${shortAddr} (You)` : shortAddr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
