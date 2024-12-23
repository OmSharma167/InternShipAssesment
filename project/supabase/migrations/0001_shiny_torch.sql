/*
  # Portfolio Tracker Schema

  1. New Tables
    - `stocks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `ticker` (text, stock symbol)
      - `name` (text, company name)
      - `quantity` (numeric, number of shares)
      - `buy_price` (numeric, purchase price per share)
      - `current_price` (numeric, latest stock price)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `stocks` table
    - Add policies for authenticated users to manage their own stocks
*/

CREATE TABLE stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  ticker text NOT NULL,
  name text NOT NULL,
  quantity numeric NOT NULL CHECK (quantity > 0),
  buy_price numeric NOT NULL CHECK (buy_price > 0),
  current_price numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own stocks"
  ON stocks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stocks"
  ON stocks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stocks"
  ON stocks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stocks"
  ON stocks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);