export interface Stock {
  id: string;
  user_id: string;
  ticker: string;
  name: string;
  quantity: number;
  buy_price: number;
  current_price: number;
  created_at: string;
  updated_at: string;
}

export interface StockFormData {
  ticker: string;
  name: string;
  quantity: number;
  buy_price: number;
}