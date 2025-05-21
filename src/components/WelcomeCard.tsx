
import { useWallet } from "@/context/WalletContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletConnect } from "./WalletConnect";

export function WelcomeCard() {
  const { user } = useWallet();

  if (user?.isConnected) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-white to-suiGray-light shadow-lg border-suiPurple/10 transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-2">
        <div className="mx-auto h-16 w-16 rounded-full sui-gradient-bg flex items-center justify-center mb-4 shadow-md">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-suiPurple to-suiPurple-light bg-clip-text text-transparent">
          Welcome to SuiSplit
        </CardTitle>
        <CardDescription className="text-center text-base">
          The easiest way to split expenses on the Sui blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6 pt-4">
        <div className="text-center mb-4 max-w-xs">
          <p className="text-sm text-muted-foreground">
            Connect your wallet to start splitting bills with friends and settle debts on-chain
          </p>
        </div>
        <div className="w-full max-w-xs animate-pulse-slow">
          <WalletConnect />
        </div>
        <div className="w-full pt-4 text-xs text-center text-muted-foreground border-t">
          <p>Safe, secure, and decentralized bill splitting</p>
        </div>
      </CardContent>
    </Card>
  );
}
