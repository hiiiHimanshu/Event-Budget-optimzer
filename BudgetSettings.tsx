import React, { useState } from 'react';
import { Settings, DollarSign } from 'lucide-react';
import { Card } from './Card';

interface BudgetSettingsProps {
  currentBudget: number;
  onUpdateBudget: (newBudget: number) => void;
}

export function BudgetSettings({ currentBudget, onUpdateBudget }: BudgetSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(currentBudget);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBudget(newBudget);
    setIsEditing(false);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-700">
          <Settings className="w-5 h-5" />
          Budget Settings
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      
      <div className={`transition-all duration-300 ${isEditing ? 'opacity-100' : 'opacity-0'}`} 
           style={{ display: isEditing ? 'block' : 'none' }}>
        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-in">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Budget</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                step="100"
                value={newBudget}
                onChange={(e) => setNewBudget(Number(e.target.value))}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Update Budget
          </button>
        </form>
      </div>
      
      <div className={`transition-all duration-300 ${!isEditing ? 'opacity-100' : 'opacity-0'}`}
           style={{ display: !isEditing ? 'block' : 'none' }}>
        <p className="text-gray-600 animate-fade-in">
          Current total budget: {' '}
          <span className="font-semibold text-indigo-600">
            ${currentBudget.toLocaleString()}
          </span>
        </p>
      </div>
    </Card>
  );
}