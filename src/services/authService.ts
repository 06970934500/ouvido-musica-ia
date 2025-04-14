
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

export type AuthUser = User;

// Verificar se o usuário está autenticado
export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
};

// Verificar a sessão atual
export const getCurrentSession = async (): Promise<Session | null> => {
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
};

// Login com email e senha
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

// Registrar um novo usuário
export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

// Sair (logout)
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Solicitar redefinição de senha
export const requestPasswordReset = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) throw error;
};

// Atualizar senha do usuário
export const updateUserPassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password,
  });
  
  if (error) throw error;
};
