import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Bell, AlertTriangle, Info } from 'lucide-react';
import { useNotices } from '../../hooks/useNotices';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const NOTICE_ICONS = {
  urgent: AlertTriangle,
  info: Info,
  reminder: Bell,
};

export default function NoticesList() {
  const [search, setSearch] = React.useState('');
  const { notices, loading } = useNotices();

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase()) ||
    notice.content.toLowerCase().includes(search.toLowerCase()) ||
    notice.type.toLowerCase().includes(search.toLowerCase())
  );

  const getNoticeIcon = (type: string) => {
    const Icon = NOTICE_ICONS[type as keyof typeof NOTICE_ICONS] || Info;
    return <Icon className="w-5 h-5" />;
  };

  const getNoticeTypeStyles = (type: string) => {
    const styles = {
      urgent: 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300',
      info: 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      reminder: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    };
    return styles[type as keyof typeof styles] || styles.info;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Avisos
        </h1>
        <Link to="new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Aviso
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <Input
          type="search"
          placeholder="Buscar avisos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Carregando avisos...</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            {search ? 'Nenhum aviso encontrado' : 'Nenhum aviso cadastrado'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <Link
              key={notice.id}
              to={notice.id}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getNoticeTypeStyles(notice.type)}`}>
                  {getNoticeIcon(notice.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {notice.title}
                    </h3>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(notice.date).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
                    {notice.content}
                  </p>
                  {notice.attachments && notice.attachments.length > 0 && (
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{notice.attachments.length} anexo(s)</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}