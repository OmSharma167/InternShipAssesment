import React from 'react';
import { supabase } from '../lib/supabase';

export function SignOutButton() {
  return (
    <button
      onClick={() => supabase.auth.signOut()}
      className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
    >
      Sign Out
    </button>
  );
}