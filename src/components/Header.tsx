
import { WalletConnect } from "./WalletConnect";
import { HelpCircle, Home } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-10 py-4 px-4 md:px-6 bg-white/95 backdrop-blur-md border-b shadow-sm transition-all">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center group">
          <div className="h-10 w-10 rounded-full sui-gradient-bg flex items-center justify-center mr-2 shadow-md transition-transform animate-float">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-suiPurple to-suiPurple-light bg-clip-text text-transparent">
              SuiSplit
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Split expenses on Sui blockchain</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:flex items-center p-2 rounded-full text-muted-foreground hover:text-suiPurple hover:bg-gray-100 transition-colors button-3d">
            <Home size={18} className="mr-2" />
            <span>Home</span>
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2 rounded-full text-muted-foreground hover:text-suiPurple hover:bg-gray-100 transition-colors button-3d">
                  <HelpCircle size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-suiPurple/10 shadow-lg">
                <p>Need help with SuiSplit?</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
