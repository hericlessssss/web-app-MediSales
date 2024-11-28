import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, Bell, Info, Pencil, Trash2 } from 'lucide-react';
import { useNotices } from '../../hooks/useNotices';
import Button from '../../components/ui/Button';

const NOTICE_ICONS = {
  urgent: AlertTriangle,
  info: Info,
  reminder: Bell,
};

const NOTICE_TYPES = {
  urgent: 'Urgente',
  info: 'Informativo',
  reminder: 'Lembrete',
};

export default function NoticeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notices, deleteNotice } = useNotices();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Aviso não encontrado</p>
      </div>
    );
  }

  const Icon = NOTICE_ICONS[notice.type as keyof typeof NOTICE_ICONS] || Info;

  const getNoticeTypeStyles = (type: string) => {
    const styles = {
      urgent: 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300',
      info: 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      reminder: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    };
    return styles[type as keyof typeof styles] || styles.info;
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este aviso?')) {
      setIsDeleting(true);
      try {
        await deleteNotice(notice.id);
        navigate('/notices');
      } catch (error) {
        console.error('Error deleting notice:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getNoticeTypeStyles(notice.type)}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {notice.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {NOTICE_TYPES[notice.type as keyof typeof NOTICE_TYPES]}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/notices/${notice.id}/edit`)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            isLoading={isDeleting}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Conteúdo
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {notice.content}
          </p>
        </div>

        <div className="border-t dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>
              Criado em:{' '}
              {new Date(notice.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <span>
              Data do aviso:{' '}
              {new Date(notice.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {notice.attachments && notice.attachments.length > 0 && (
          <div className="border-t dark:border-gray-700 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Anexos
            </h2>
            <div className="space-y-2">
              {notice.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {attachment.split('/').pop()}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}