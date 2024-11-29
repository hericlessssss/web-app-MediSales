import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';
import { toast } from 'react-hot-toast'; // Para fornecer feedback ao usuário

interface AuthState {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  signUp: async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || 'Erro ao criar conta. Tente novamente.');
      throw error;
    }

    toast.success(
      `Cadastro realizado com sucesso! Por favor, confirme o e-mail enviado para ${email} antes de fazer login.`
    );
  },

  signIn: async (email: string, password: string) => {
    if (!email || !password) {
      toast.error('E-mail e senha são obrigatórios.');
      throw new Error('E-mail e senha não podem estar vazios.');
    }

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Credenciais inválidas. Verifique o e-mail e a senha.');
      } else if (error.message.includes('Email not confirmed')) {
        toast.error('E-mail não confirmado. Verifique sua caixa de entrada.');
      } else {
        toast.error('Erro ao fazer login. Tente novamente.');
      }
      throw error;
    }

    set({ user: data.user });
    toast.success('Login realizado com sucesso!');
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('Erro ao sair. Tente novamente.');
      throw error;
    }

    set({ user: null });
    toast.success('Você saiu com sucesso.');
  },

  initialize: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        toast.error('Erro ao inicializar sessão.');
        throw error;
      }

      set({ user: session?.user ?? null, loading: false });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null });
      });
    } catch (error) {
      set({ loading: false });
      console.error('Erro ao inicializar a sessão:', error);
    }
  },
}));
