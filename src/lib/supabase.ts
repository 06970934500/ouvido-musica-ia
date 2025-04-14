
import { createClient } from '@supabase/supabase-js';

// Use specific fallback values for development if environment variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://swagzcdevlsbypoldnbq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3YWd6Y2RldmxzYnlwb2xkbmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Nzc2ODQsImV4cCI6MjA2MDA1MzY4NH0.tXtIGeyKOAFJewxLJIY1I0HfVBTyjvZkSs9MOLXumLU';

// Create the Supabase client with the URL and key
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Log success message if client was initialized successfully
console.log('Supabase client initialized successfully');
