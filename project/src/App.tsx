import React from 'react';
import { useAuth } from './hooks/useAuth';
import { Auth } from './components/Auth';
import { Portfolio } from './components/Portfolio';

export default function App() {
  const { user } = useAuth();

  if (!user) {
    return <Auth />;
  }

  return <Portfolio user={user} />;
}