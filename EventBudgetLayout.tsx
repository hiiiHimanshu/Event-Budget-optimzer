import React from 'react';
import { useApp } from '../context/AppContext';
import { BudgetSettings } from '../components/BudgetSettings';
import { BudgetOverview } from '../components/BudgetOverview';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';

export function EventBudgetLayout() {
  const { budget, totalBudget, expenses, updateBudget, addExpense, deleteExpense } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 mb-8 animate-fade-in">
          Event Budget Optimizer
        </h1>
        <div className="space-y-6">
          <BudgetSettings currentBudget={totalBudget} onUpdateBudget={updateBudget} />
          <BudgetOverview budget={budget} />
          <ExpenseForm onAddExpense={addExpense} />
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  );
}