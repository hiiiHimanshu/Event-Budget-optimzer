import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Expense, Budget } from '../types';

interface AppContextType {
  expenses: Expense[];
  totalBudget: number;
  budget: Budget;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateBudget: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalBudget, setTotalBudget] = useState(10000);

  const budget: Budget = {
    total: totalBudget,
    spent: expenses.reduce((sum, expense) => sum + expense.amount, 0),
    remaining: totalBudget - expenses.reduce((sum, expense) => sum + expense.amount, 0),
    categories: expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>),
  };

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses([...expenses, { ...newExpense, id: uuidv4() }]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const updateBudget = (amount: number) => {
    setTotalBudget(amount);
  };

  return (
    <AppContext.Provider 
      value={{ 
        expenses, 
        totalBudget, 
        budget, 
        addExpense, 
        deleteExpense, 
        updateBudget 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}