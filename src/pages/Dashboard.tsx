import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Bell } from 'lucide-react';
import { useDoctors } from '../hooks/useDoctors';
import { useNotices } from '../hooks/useNotices';

export default function Dashboard() {
  const { doctors } = useDoctors();
  const { notices } = useNotices();

  const recentNotices = notices.slice(0, 3);
  const recentDoctors = doctors.slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Médicos
            </h2>
            <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {doctors.length}
          </p>
          <Link
            to="/doctors"
            className="mt-4 inline-block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Ver todos →
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Avisos
            </h2>
            <Bell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {notices.length}
          </p>
          <Link
            to="/notices"
            className="mt-4 inline-block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Ver todos →
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Agenda
            </h2>
            <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            0
          </p>
          <span className="mt-4 inline-block text-sm text-gray-600 dark:text-gray-400">
            Em breve
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Últimos Avisos
            </h2>
            <Link
              to="/notices"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Ver todos
            </Link>
          </div>
          {recentNotices.length > 0 ? (
            <div className="space-y-4">
              {recentNotices.map((notice) => (
                <Link
                  key={notice.id}
                  to={`/notices/${notice.id}`}
                  className="block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {notice.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(notice.date).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum aviso cadastrado
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Médicos Recentes
            </h2>
            <Link
              to="/doctors"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Ver todos
            </Link>
          </div>
          {recentDoctors.length > 0 ? (
            <div className="space-y-4">
              {recentDoctors.map((doctor) => (
                <Link
                  key={doctor.id}
                  to={`/doctors/${doctor.id}`}
                  className="block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {doctor.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {doctor.specialty} - CRM: {doctor.crm}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum médico cadastrado
            </p>
          )}
        </div>
      </div>
    </div>
  );
}