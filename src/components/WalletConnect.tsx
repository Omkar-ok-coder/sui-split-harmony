
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { LogOut, Wallet } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function WalletConnect() {
  const { user, connectWallet, disconnectWallet, isConnecting } = useWallet();

  if (!user || !user.isConnected) {
    return (
      <Button 
        onClick={connectWallet} 
        className="bg-suiPurple hover:bg-suiPurple-dark"
        disabled={isConnecting}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-suiPurple text-suiPurple font-medium">
          <Wallet className="mr-2 h-4 w-4" />
          {user.shortAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive" 
          onClick={disconnectWallet}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
