import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    set({ user: data.user });
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, loading: false });
    
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },
}));