import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { Doctor } from '../types';

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      const { data, error } = await supabase
        .from('medicos')
        .select('*')
        .order('name');

      if (error) throw error;
      setDoctors(data);
    } catch (error) {
      toast.error('Erro ao carregar médicos');
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createDoctor(doctor: Omit<Doctor, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('medicos')
        .insert([doctor])
        .select()
        .single();

      if (error) throw error;
      setDoctors((prev) => [...prev, data]);
      toast.success('Médico cadastrado com sucesso!');
      return data;
    } catch (error) {
      toast.error('Erro ao cadastrar médico');
      console.error('Error creating doctor:', error);
      throw error;
    }
  }

  async function updateDoctor(id: string, doctor: Partial<Doctor>) {
    try {
      const { data, error } = await supabase
        .from('medicos')
        .update(doctor)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setDoctors((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...data } : d))
      );
      toast.success('Médico atualizado com sucesso!');
      return data;
    } catch (error) {
      toast.error('Erro ao atualizar médico');
      console.error('Error updating doctor:', error);
      throw error;
    }
  }

  async function deleteDoctor(id: string) {
    try {
      const { error } = await supabase.from('medicos').delete().eq('id', id);
      if (error) throw error;
      setDoctors((prev) => prev.filter((d) => d.id !== id));
      toast.success('Médico removido com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover médico');
      console.error('Error deleting doctor:', error);
      throw error;
    }
  }

  return {
    doctors,
    loading,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  };
}