
// Este arquivo está sendo substituído pelo cliente oficial do Supabase em @/integrations/supabase/client.ts
import { supabase } from '@/integrations/supabase/client';

// Redirecionar todas as importações para o cliente oficial
export { supabase };

// Log de aviso para que saibamos que este arquivo ainda está sendo usado
console.warn('src/lib/supabase.ts está obsoleto. Use @/integrations/supabase/client.ts em vez disso.');
