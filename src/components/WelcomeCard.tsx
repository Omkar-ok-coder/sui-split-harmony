
import { useWallet } from "@/context/WalletContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { WalletConnect } from "./WalletConnect";
import { Badge } from "@/components/ui/badge";

export function WelcomeCard() {
  const { user } = useWallet();

  if (user?.isConnected) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-white to-suiGray-light dark:from-gray-800 dark:to-gray-700 shadow-lg border-suiPurple/10 dark:border-gray-600 transition-all duration-300 hover:shadow-xl card-hover">
      <CardHeader className="pb-2">
        <div className="mx-auto h-16 w-16 rounded-full sui-gradient-bg flex items-center justify-center mb-4 shadow-md animate-float">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-suiPurple to-suiPurple-light bg-clip-text text-transparent">
          Welcome to SuiSplit
        </CardTitle>
        <CardDescription className="text-center text-base dark:text-gray-300">
          The easiest way to split expenses on the Sui blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6 pt-4">
        <div className="text-center mb-4 max-w-xs">
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Connect your wallet to start splitting bills with friends and settle debts on-chain
          </p>
        </div>
        <div className="w-full max-w-xs animate-pulse-slow">
          <WalletConnect />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          <Badge variant="outline" className="bg-white/50 dark:bg-gray-700/50 text-suiPurple dark:text-suiPurple-light">Easy to use</Badge>
          <Badge variant="outline" className="bg-white/50 dark:bg-gray-700/50 text-suiPurple dark:text-suiPurple-light">Secure</Badge>
          <Badge variant="outline" className="bg-white/50 dark:bg-gray-700/50 text-suiPurple dark:text-suiPurple-light">Decentralized</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-4 text-xs text-center text-muted-foreground dark:text-gray-400 border-t dark:border-gray-600">
        <p>Safe, secure, and decentralized bill splitting</p>
      </CardFooter>
    </Card>
  );
}
