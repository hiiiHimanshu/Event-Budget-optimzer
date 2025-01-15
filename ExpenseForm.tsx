import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Expense, ExpenseCategory } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const categories: ExpenseCategory[] = [
  'Venue',
  'Catering',
  'Decoration',
  'Entertainment',
  'Marketing',
  'Staff',
  'Other',
];

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: '',
    vendor: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense({
      category: formData.category,
      description: formData.description,
      amount: Number(formData.amount),
      vendor: formData.vendor,
      date: formData.date,
    });
    setFormData({
      category: '',
      description: '',
      amount: '',
      vendor: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5" />
        Add Expense
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vendor</label>
          <input
            type="text"
            value={formData.vendor}
            onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Expense
      </button>
    </form>
  );
}