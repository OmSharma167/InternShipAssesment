import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Stock, StockFormData } from '../types/stock';

export function useStocks(user: User) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);

  useEffect(() => {
    fetchStocks();
  }, [user.id]);

  const fetchStocks = async () => {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stocks:', error);
      return;
    }

    setStocks(data || []);
  };

  const addStock = async (formData: StockFormData) => {
    const { error } = await supabase
      .from('stocks')
      .insert([{ 
        ...formData, 
        current_price: formData.buy_price,
        user_id: user.id 
      }]);

    if (error) {
      console.error('Error adding stock:', error);
      return;
    }

    fetchStocks();
  };

  const updateStock = async (id: string, formData: StockFormData) => {
    const { error } = await supabase
      .from('stocks')
      .update({ ...formData, current_price: formData.buy_price })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating stock:', error);
      return;
    }

    setEditingStock(null);
    fetchStocks();
  };

  const deleteStock = async (id: string) => {
    const { error } = await supabase
      .from('stocks')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting stock:', error);
      return;
    }

    fetchStocks();
  };

  return {
    stocks,
    addStock,
    updateStock,
    deleteStock,
    editingStock,
    setEditingStock
  };
}