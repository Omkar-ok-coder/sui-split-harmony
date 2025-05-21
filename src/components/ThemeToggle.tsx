
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:text-suiPurple hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors button-3d"
          >
            {theme === 'light' ? (
              <Moon size={18} className="transition-all" />
            ) : (
              <Sun size={18} className="transition-all" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white dark:bg-gray-800 border border-suiPurple/10 shadow-lg">
          <p>{theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
