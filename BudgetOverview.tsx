import React from 'react';
import { DollarSign, PieChart, AlertTriangle } from 'lucide-react';
import { Card } from './Card';
import type { Budget } from '../types';

interface BudgetOverviewProps {
  budget: Budget;
}

export function BudgetOverview({ budget }: BudgetOverviewProps) {
  const percentageSpent = (budget.spent / budget.total) * 100;
  const isOverBudget = budget.spent > budget.total;

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-700">
        <PieChart className="w-5 h-5" />
        Budget Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Budget', value: budget.total },
          { label: 'Spent', value: budget.spent },
          { 
            label: 'Remaining', 
            value: budget.remaining,
            className: isOverBudget ? 'text-red-600' : 'text-green-600'
          }
        ].map((item, index) => (
          <div 
            key={item.label}
            className="p-4 bg-gray-50 rounded-lg transform hover:scale-105 transition-all duration-300 animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </div>
            <span className={`text-2xl font-bold ${item.className || ''}`}>
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Budget Progress</span>
          <span className="text-sm font-medium text-gray-600">{percentageSpent.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${
              isOverBudget ? 'bg-red-600' : percentageSpent > 90 ? 'bg-yellow-500' : 'bg-green-600'
            }`}
            style={{ width: `${Math.min(percentageSpent, 100)}%` }}
          />
        </div>
      </div>

      {isOverBudget && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 animate-scale-in">
          <AlertTriangle className="w-5 h-5" />
          <span>Warning: You are over budget!</span>
        </div>
      )}
    </Card>
  );
}