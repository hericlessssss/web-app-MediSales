import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { Notice } from '../types';

export function useNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  async function fetchNotices() {
    try {
      const { data, error } = await supabase
        .from('muralavisos')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setNotices(data);
    } catch (error) {
      toast.error('Erro ao carregar avisos');
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createNotice(notice: Omit<Notice, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('muralavisos')
        .insert([notice])
        .select()
        .single();

      if (error) throw error;
      setNotices((prev) => [data, ...prev]);
      toast.success('Aviso criado com sucesso!');
      return data;
    } catch (error) {
      toast.error('Erro ao criar aviso');
      console.error('Error creating notice:', error);
      throw error;
    }
  }

  async function updateNotice(id: string, notice: Partial<Notice>) {
    try {
      const { data, error } = await supabase
        .from('muralavisos')
        .update(notice)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setNotices((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...data } : n))
      );
      toast.success('Aviso atualizado com sucesso!');
      return data;
    } catch (error) {
      toast.error('Erro ao atualizar aviso');
      console.error('Error updating notice:', error);
      throw error;
    }
  }

  async function deleteNotice(id: string) {
    try {
      const { error } = await supabase.from('muralavisos').delete().eq('id', id);
      if (error) throw error;
      setNotices((prev) => prev.filter((n) => n.id !== id));
      toast.success('Aviso removido com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover aviso');
      console.error('Error deleting notice:', error);
      throw error;
    }
  }

  return {
    notices,
    loading,
    createNotice,
    updateNotice,
    deleteNotice,
  };
}