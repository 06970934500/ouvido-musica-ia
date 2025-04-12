
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificamos se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não foram configurados.');
  console.error('Por favor, certifique-se de que as variáveis de ambiente estão definidas no Supabase.');
}

// Criamos o cliente Supabase se as credenciais estiverem disponíveis
export const supabase = createClient(
  supabaseUrl || '',  // Fallback para string vazia
  supabaseAnonKey || ''  // Fallback para string vazia
);
