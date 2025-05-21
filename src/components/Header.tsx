
import { WalletConnect } from "./WalletConnect";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Header() {
  return (
    <header className="sticky top-0 z-10 py-4 px-4 md:px-6 bg-white/95 backdrop-blur-md border-b shadow-sm transition-all">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center group">
          <div className="h-10 w-10 rounded-full sui-gradient-bg flex items-center justify-center mr-2 shadow-md transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-suiPurple to-suiPurple-light bg-clip-text text-transparent">
              SuiSplit
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Split expenses on Sui blockchain</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-full text-muted-foreground hover:text-suiPurple hover:bg-gray-100 transition-colors">
                  <HelpCircle size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Need help? Click here</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
