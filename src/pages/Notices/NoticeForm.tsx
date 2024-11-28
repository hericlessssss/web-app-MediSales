import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNotices } from '../../hooks/useNotices';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function NoticeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notices, createNotice, updateNotice } = useNotices();
  const [isLoading, setIsLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    type: 'info',
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    attachments: [] as string[],
  });

  React.useEffect(() => {
    if (id) {
      const notice = notices.find((n) => n.id === id);
      if (notice) {
        setFormData({
          type: notice.type,
          title: notice.title,
          content: notice.content,
          date: new Date(notice.date).toISOString().split('T')[0],
          attachments: notice.attachments,
        });
      }
    }
  }, [id, notices]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await updateNotice(id, {
          ...formData,
          date: new Date(formData.date).toISOString(),
        });
      } else {
        await createNotice({
          ...formData,
          date: new Date(formData.date).toISOString(),
        });
      }
      navigate('/notices');
    } catch (error) {
      console.error('Error saving notice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {id ? 'Editar Aviso' : 'Novo Aviso'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Tipo
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="info">Informativo</option>
              <option value="urgent">Urgente</option>
              <option value="reminder">Lembrete</option>
            </select>
          </div>

          <Input
            label="Título"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Conteúdo
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <Input
            type="date"
            label="Data"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/notices')}
          >
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {id ? 'Atualizar' : 'Criar'} Aviso
          </Button>
        </div>
      </form>
    </div>
  );
}