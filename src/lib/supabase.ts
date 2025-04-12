
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não foram configurados.');
  console.error('Por favor, certifique-se de que as variáveis de ambiente estão definidas no Supabase.');
}

// Criamos um cliente fictício para evitar erros em tempo de execução quando as credenciais não estão disponíveis
// mas em produção, certifique-se de que as credenciais estão configuradas corretamente
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ error: new Error('Configuração do Supabase incompleta') }),
        signUp: () => Promise.resolve({ error: new Error('Configuração do Supabase incompleta') }),
        signOut: () => Promise.resolve({ error: new Error('Configuração do Supabase incompleta') }),
        resetPasswordForEmail: () => Promise.resolve({ error: new Error('Configuração do Supabase incompleta') }),
      },
    };
