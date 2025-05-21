
import { WalletConnect } from "./WalletConnect";

export function Header() {
  return (
    <header className="sticky top-0 z-10 py-4 px-4 md:px-6 bg-white/90 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full sui-gradient-bg flex items-center justify-center mr-2">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className="text-xl font-bold text-suiPurple">SuiSplit</h1>
        </div>
        <WalletConnect />
      </div>
    </header>
  );
}
