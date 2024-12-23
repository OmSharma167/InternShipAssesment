import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Stock } from '../types/stock';
import { formatDistanceToNow } from 'date-fns';

interface StockListProps {
  stocks: Stock[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (stock: Stock) => void;
}

export function StockList({ stocks, onDelete, onEdit }: StockListProps) {
  const calculateGainLoss = (stock: Stock) => {
    const currentValue = stock.quantity * stock.current_price;
    const purchaseValue = stock.quantity * stock.buy_price;
    return currentValue - purchaseValue;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map((stock) => {
            const gainLoss = calculateGainLoss(stock);
            return (
              <tr key={stock.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{stock.ticker}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stock.buy_price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stock.current_price.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${gainLoss.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDistanceToNow(new Date(stock.updated_at), { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(stock)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(stock.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}