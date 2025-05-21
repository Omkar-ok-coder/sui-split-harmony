
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { LogOut, Wallet } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function WalletConnect() {
  const { user, connectWallet, disconnectWallet, isConnecting } = useWallet();

  if (!user || !user.isConnected) {
    return (
      <Button 
        onClick={connectWallet} 
        className="bg-suiPurple hover:bg-suiPurple-dark transition-all duration-300 shadow hover:shadow-md"
        disabled={isConnecting}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? (
          <span className="flex items-center">
            <span className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></span>
            Connecting...
          </span>
        ) : (
          "Connect Wallet"
        )}
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="border-suiPurple text-suiPurple font-medium hover:bg-suiPurple/10 transition-all duration-300"
              >
                <div className="h-5 w-5 rounded-full sui-gradient-bg flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">{user.shortAddress.charAt(0)}</span>
                </div>
                {user.shortAddress}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1">
              <div className="px-2 py-1.5 text-xs text-muted-foreground mb-1">
                Connected as {user.shortAddress}
              </div>
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 transition-colors" 
                onClick={disconnectWallet}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>Connected wallet: {user.shortAddress}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
