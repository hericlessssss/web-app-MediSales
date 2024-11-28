import React from 'react';
import { Moon, Sun, Bell } from 'lucide-react';
import { useThemeStore } from '../../stores/useThemeStore';
import Button from '../../components/ui/Button';

export default function Settings() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  React.useEffect(() => {
    // Check if notifications are supported and permission is granted
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('Este navegador não suporta notificações desktop');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Configurações
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
        {/* Theme Settings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Aparência
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
              <span className="text-gray-700 dark:text-gray-300">
                Tema {isDarkMode ? 'Escuro' : 'Claro'}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={toggleTheme}
              className="flex items-center space-x-2"
            >
              <span>Alternar tema</span>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="border-t dark:border-gray-700" />

        {/* Notification Settings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Notificações
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="space-y-1">
                <p className="text-gray-700 dark:text-gray-300">
                  Notificações do navegador
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receba alertas sobre novos avisos e eventos
                </p>
              </div>
            </div>
            <Button
              variant={notificationsEnabled ? 'outline' : 'primary'}
              onClick={requestNotificationPermission}
              disabled={notificationsEnabled}
            >
              {notificationsEnabled ? 'Ativadas' : 'Ativar'}
            </Button>
          </div>
        </div>

        {/* System Information */}
        <div className="border-t dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informações do Sistema
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Versão</span>
              <span className="text-gray-900 dark:text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Última atualização
              </span>
              <span className="text-gray-900 dark:text-white">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}