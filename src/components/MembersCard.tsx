
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookUser } from "lucide-react";

export function MembersCard() {
  const { user } = useWallet();
  const { groupMembers } = useExpenses();
  
  if (!user?.isConnected) {
    return null;
  }

  return (
    <Card className="border-suiPurple/10 shadow-sm hover:shadow-md transition-all card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2 card-header-gradient">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full sui-gradient-bg flex items-center justify-center shadow-sm">
            <BookUser className="h-4 w-4 text-white" />
          </div>
          <div>
            <CardTitle>Group Members</CardTitle>
            <CardDescription>People in your expense group</CardDescription>
          </div>
        </div>
        <AddMemberForm />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {groupMembers.map((address) => {
              const shortAddr = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
              const isCurrentUser = user?.address === address;
              
              return (
                <HoverCard key={address}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center p-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors cursor-default transform hover:translate-x-1 duration-200">
                      <div className="h-8 w-8 rounded-full sui-gradient-bg flex items-center justify-center mr-2 shadow-sm">
                        <span className="text-white text-xs font-medium">{shortAddr.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {isCurrentUser ? `${shortAddr} (You)` : shortAddr}
                        </p>
                      </div>
                      {isCurrentUser && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-suiPurple/10 text-suiPurple">
                          You
                        </span>
                      )}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm border border-suiPurple/10 shadow-lg">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Wallet Address</h4>
                        <p className="text-xs text-muted-foreground break-all">
                          {address}
                        </p>
                        {isCurrentUser && (
                          <p className="text-xs text-suiPurple font-medium">This is you</p>
                        )}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
