export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  vendor?: string;
}

export interface Budget {
  total: number;
  spent: number;
  remaining: number;
  categories: {
    [key: string]: number;
  };
}

export type ExpenseCategory = 
  | 'Venue'
  | 'Catering'
  | 'Decoration'
  | 'Entertainment'
  | 'Marketing'
  | 'Staff'
  | 'Other';