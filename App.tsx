import React from 'react';
import { AppProvider } from './context/AppContext';
import { EventBudgetLayout } from './layouts/EventBudgetLayout';

export function App() {
  return (
    <AppProvider>
      <EventBudgetLayout />
    </AppProvider>
  );
}