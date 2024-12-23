# Portfolio Tracker

A full-stack web application for tracking stock portfolios with real-time updates and user authentication.

![Portfolio Tracker Screenshot](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200)

## Features

- 🔐 Secure user authentication
- 📈 Real-time stock portfolio tracking
- 💼 CRUD operations for stock holdings
- 📊 Interactive dashboard with portfolio metrics
- 📱 Responsive design for all devices
- 🛡️ Row-level security with Supabase

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide React (icons)
  - date-fns (date formatting)

- **Backend & Database:**
  - Supabase (Backend as a Service)
  - PostgreSQL (database)
  - Row Level Security (RLS)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-tracker.git
   cd portfolio-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
portfolio-tracker/
├── src/
│   ├── components/         # React components
│   │   ├── Auth.tsx       # Authentication component
│   │   ├── Dashboard.tsx  # Portfolio metrics
│   │   ├── StockForm.tsx  # Add/Edit stock form
│   │   └── StockList.tsx  # Stock holdings table
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.ts     # Authentication logic
│   │   └── useStocks.ts   # Stock management logic
│   ├── lib/               # Utilities and configurations
│   │   └── supabase.ts    # Supabase client
│   ├── types/             # TypeScript definitions
│   └── App.tsx            # Root component
├── supabase/
│   └── migrations/        # Database migrations
└── public/               # Static assets
```

## Features in Detail

### Authentication
- Email/password authentication
- Protected routes
- Automatic session management

### Portfolio Management
- Add new stocks with ticker, name, quantity, and purchase price
- Edit existing holdings
- Delete stocks from portfolio
- Real-time portfolio value calculations

### Dashboard
- Total portfolio value
- Total gain/loss
- Number of stocks
- Top performing stock

## Database Schema

### Stocks Table
```sql
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
```

## Security

- Row Level Security (RLS) ensures users can only access their own data
- Secure authentication through Supabase
- Input validation on both client and server side
- Protected API endpoints

## Deployment

The application is deployed on Netlify and can be accessed at:
[https://spiffy-malabi-908d05.netlify.app](https://spiffy-malabi-908d05.netlify.app)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Supabase](https://supabase.io/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons