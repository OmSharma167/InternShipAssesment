import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { Stock } from '../types/stock';

interface DashboardProps {
  stocks: Stock[];
}

export function Dashboard({ stocks }: DashboardProps) {
  const calculateTotalValue = () => {
    return stocks.reduce((total, stock) => total + stock.quantity * stock.current_price, 0);
  };

  const calculateTotalGainLoss = () => {
    return stocks.reduce((total, stock) => {
      const gainLoss = (stock.current_price - stock.buy_price) * stock.quantity;
      return total + gainLoss;
    }, 0);
  };

  const findTopPerformer = () => {
    if (stocks.length === 0) return null;
    return stocks.reduce((best, current) => {
      const bestReturn = (best.current_price - best.buy_price) / best.buy_price;
      const currentReturn = (current.current_price - current.buy_price) / current.buy_price;
      return currentReturn > bestReturn ? current : best;
    });
  };

  const topPerformer = findTopPerformer();
  const totalValue = calculateTotalValue();
  const totalGainLoss = calculateTotalGainLoss();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Portfolio Value</p>
            <p className="text-2xl font-semibold text-gray-900">${totalValue.toFixed(2)}</p>
          </div>
          <DollarSign className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Gain/Loss</p>
            <p className={`text-2xl font-semibold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totalGainLoss.toFixed(2)}
            </p>
          </div>
          {totalGainLoss >= 0 ? (
            <TrendingUp className="w-8 h-8 text-green-500" />
          ) : (
            <TrendingDown className="w-8 h-8 text-red-500" />
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Number of Stocks</p>
            <p className="text-2xl font-semibold text-gray-900">{stocks.length}</p>
          </div>
          <PieChart className="w-8 h-8 text-purple-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div>
          <p className="text-sm font-medium text-gray-600">Top Performer</p>
          {topPerformer ? (
            <>
              <p className="text-lg font-semibold text-gray-900">{topPerformer.ticker}</p>
              <p className="text-sm text-gray-600">{topPerformer.name}</p>
            </>
          ) : (
            <p className="text-lg text-gray-400">No stocks yet</p>
          )}
        </div>
      </div>
    </div>
  );
}