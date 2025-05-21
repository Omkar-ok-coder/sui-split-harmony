
export interface User {
  address: string;
  shortAddress: string;
  isConnected: boolean;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  payer: string;
  date: Date;
  participants: string[];
  split: Record<string, number>;
}

export interface Balance {
  user: string;
  owes: Record<string, number>;
  owed: Record<string, number>;
  netBalance: number;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}
