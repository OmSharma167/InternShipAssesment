import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { StockFormData } from '../types/stock';

interface StockFormProps {
  onSubmit: (data: StockFormData) => Promise<void>;
}

export function StockForm({ onSubmit }: StockFormProps) {
  const [formData, setFormData] = useState<StockFormData>({
    ticker: '',
    name: '',
    quantity: 0,
    buy_price: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ ticker: '', name: '', quantity: 0, buy_price: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Stock</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ticker</label>
          <input
            type="text"
            value={formData.ticker}
            onChange={(e) => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            min="0"
            step="1"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Buy Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.buy_price}
            onChange={(e) => setFormData({ ...formData, buy_price: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Stock
      </button>
    </form>
  );
}