
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
    <Card className="w-full max-w-md mx-auto bg-gradient-to-r from-white to-suiGray-light">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome to SuiSplit</CardTitle>
        <CardDescription className="text-center">
          The easiest way to split expenses on the Sui blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="text-center mb-4 max-w-xs">
          <p className="text-sm text-muted-foreground">
            Connect your wallet to start splitting bills with friends and settle debts on-chain
          </p>
        </div>
        <WalletConnect />
      </CardContent>
    </Card>
  );
}
