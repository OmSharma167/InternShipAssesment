import React from 'react';
import { User } from '@supabase/supabase-js';
import { useStocks } from '../hooks/useStocks';
import { Dashboard } from './Dashboard';
import { StockForm } from './StockForm';
import { StockList } from './StockList';
import { SignOutButton } from './SignOutButton';

interface PortfolioProps {
  user: User;
}

export function Portfolio({ user }: PortfolioProps) {
  const { stocks, addStock, updateStock, deleteStock, editingStock, setEditingStock } = useStocks(user);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Tracker</h1>
          <SignOutButton />
        </div>
        
        <div className="space-y-8">
          <Dashboard stocks={stocks} />
          
          <StockForm
            onSubmit={editingStock ? 
              (data) => updateStock(editingStock.id, data) : 
              addStock
            }
          />
          
          <StockList
            stocks={stocks}
            onDelete={deleteStock}
            onEdit={setEditingStock}
          />
        </div>
      </div>
    </div>
  );
}