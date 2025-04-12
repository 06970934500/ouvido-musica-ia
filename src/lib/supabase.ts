
import { createClient } from '@supabase/supabase-js';

// Use specific fallback values for development if environment variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://swagzcdevlsbypoldnbq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3YWd6Y2RldmxzYnlwb2xkbmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyODQxODYsImV4cCI6MjAyODg2MDE4Nn0.W3IJGEOLhQOMadZM0tbWpV5VQhDTxKJJp0KK15XtjUw';

// Create the Supabase client with the URL and key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log success message if client was created successfully
console.log('Supabase client initialized successfully');
