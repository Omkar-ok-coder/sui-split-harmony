
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Expense, Balance, Settlement, User } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useWallet } from './WalletContext';
import { toast } from '@/hooks/use-toast';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'split'>) => void;
  balances: Record<string, Balance>;
  settlements: Settlement[];
  generateSettlements: () => void;
  settleDebt: (from: string, to: string, amount: number) => void;
  userBalances: Balance | null;
  groupMembers: string[];
  addGroupMember: (address: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const { user } = useWallet();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Record<string, Balance>>({});
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [groupMembers, setGroupMembers] = useState<string[]>([]);

  // Add the current user to group members when they connect
  useEffect(() => {
    if (user && user.isConnected && !groupMembers.includes(user.address)) {
      setGroupMembers(prev => [...prev, user.address]);
    }
  }, [user, groupMembers]);

  // Calculate balances whenever expenses change
  useEffect(() => {
    calculateBalances();
  }, [expenses, groupMembers]);

  const addExpense = (expense: Omit<Expense, 'id' | 'split'>) => {
    // Calculate equal split
    const splitAmount = expense.amount / expense.participants.length;
    const split: Record<string, number> = {};
    
    expense.participants.forEach(participant => {
      if (participant === expense.payer) {
        // The payer pays the full amount but only owes their share
        split[participant] = expense.amount - splitAmount;
      } else {
        // Everyone else owes their share
        split[participant] = -splitAmount;
      }
    });

    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
      split
    };

    setExpenses(prev => [...prev, newExpense]);
    toast({
      title: "Expense added",
      description: `${expense.description} - $${expense.amount.toFixed(2)}`,
    });
  };

  const calculateBalances = () => {
    // Initialize balance object for all members
    const newBalances: Record<string, Balance> = {};
    
    groupMembers.forEach(member => {
      newBalances[member] = {
        user: member,
        owes: {},
        owed: {},
        netBalance: 0
      };
    });

    // Process all expenses
    expenses.forEach(expense => {
      Object.entries(expense.split).forEach(([user, amount]) => {
        // Skip users not in split
        if (!newBalances[user]) return;

        // Positive amount means others owe this user
        if (amount > 0) {
          expense.participants.forEach(participant => {
            if (participant !== user) {
              // Calculate how much each participant owes the payer
              const owed = Math.abs(expense.split[participant] || 0);
              
              // Update the "owed" record for the payer
              newBalances[user].owed[participant] = (newBalances[user].owed[participant] || 0) + owed;
              
              // Update the "owes" record for the participant
              if (newBalances[participant]) {
                newBalances[participant].owes[user] = (newBalances[participant].owes[user] || 0) + owed;
              }
            }
          });
        }
      });
    });

    // Calculate net balance for each user
    Object.keys(newBalances).forEach(user => {
      let totalOwed = 0;
      let totalOwes = 0;
      
      Object.values(newBalances[user].owed).forEach(amount => {
        totalOwed += amount;
      });
      
      Object.values(newBalances[user].owes).forEach(amount => {
        totalOwes += amount;
      });
      
      newBalances[user].netBalance = totalOwed - totalOwes;
    });

    setBalances(newBalances);
  };

  const addGroupMember = (address: string) => {
    if (!groupMembers.includes(address)) {
      setGroupMembers(prev => [...prev, address]);
      toast({
        title: "Member added",
        description: `Added ${address.substring(0, 6)}...${address.substring(address.length - 4)} to group`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Member already exists",
        description: "This address is already in the group",
      });
    }
  };

  const generateSettlements = () => {
    const debts: Settlement[] = [];
    
    // Create a copy of balances to work with
    const balancesCopy = JSON.parse(JSON.stringify(balances));
    
    // Simplify debts by looking at who owes who
    Object.keys(balancesCopy).forEach(from => {
      Object.keys(balancesCopy[from].owes).forEach(to => {
        const fromOwesToAmount = balancesCopy[from].owes[to] || 0;
        const toOwesFromAmount = balancesCopy[to].owes[from] || 0;
        
        // Calculate the net debt
        const netAmount = fromOwesToAmount - toOwesFromAmount;
        
        if (netAmount > 0) {
          // from user needs to pay to user
          debts.push({
            from,
            to,
            amount: netAmount
          });
        }
      });
    });
    
    setSettlements(debts);
    
    if (debts.length === 0) {
      toast({
        title: "No settlements needed",
        description: "Everyone's settled up!",
      });
    } else {
      toast({
        title: "Settlements generated",
        description: `${debts.length} settlements needed`,
      });
    }
  };

  const settleDebt = (from: string, to: string, amount: number) => {
    // In a real app, this would create a transaction
    // For now, just remove the settlement
    setSettlements(prev => prev.filter(
      settlement => !(settlement.from === from && settlement.to === to && settlement.amount === amount)
    ));
    
    toast({
      title: "Debt settled",
      description: `${amount.toFixed(2)} paid to ${to.substring(0, 6)}...`,
    });
  };

  // Get current user's balance
  const userBalances = user ? balances[user.address] : null;

  return (
    <ExpenseContext.Provider 
      value={{ 
        expenses, 
        addExpense, 
        balances, 
        settlements, 
        generateSettlements, 
        settleDebt,
        userBalances,
        groupMembers,
        addGroupMember
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}
