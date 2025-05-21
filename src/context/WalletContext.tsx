
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { toast } from '@/hooks/use-toast';

interface WalletContextType {
  user: User | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Mock wallet connection for MVP
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random mock address
      const address = `0x${Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      // Create a short display version
      const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
      
      setUser({ 
        address, 
        shortAddress, 
        isConnected: true 
      });
      
      toast({
        title: "Wallet connected",
        description: `Connected to ${shortAddress}`,
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Could not connect to wallet",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setUser(null);
    toast({
      title: "Wallet disconnected",
    });
  };

  return (
    <WalletContext.Provider value={{ user, connectWallet, disconnectWallet, isConnecting }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
